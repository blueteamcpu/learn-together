const axios = require('axios');
const db = require('../server/db/index');
const fs = require('fs');
const path = require('path');

// Make sure our 'courseLists' directory is available to use
if ( ! fs.existsSync(path.join(__dirname, 'courseLists'))) {
  fs.mkdirSync(path.join(__dirname, 'courseLists'), 0777);
}

const currentFiles = fs.readdirSync(path.join(__dirname, 'courseLists'));

// Add all files to create here as needed
const filesToCheck = ["khanAcademy"];
// Add to apiInformation as needed
const apiInformation = [
  { fileName: 'khanAcademy',
    info: { providerName: 'Khan Academy',
	    url: 'http://www.khanacademy.org/api/v1/topictree?kind=topic',
	    headers: '',
	    func: createKhanCourse,
	    apikey: 'unknown',
	  },
    func: createKhanCourse,
  }
];

const currentTime = new Date();
// One week time in milliseconds - So not really a magic number anymore
const weekMS = 604800000;

const listOfGets = filesToCheck.filter(file => {
  if(!currentFiles.includes(file)) return true;
  const stats = fs.statSync(path.join(__dirname, 'courseLists', file));
  // Check and see if the existing file is more than a week old
  // If it is we add to the list to get new data
  if(currentTime - stats.mtime > weekMS) return true;
  return false;
});

getAllCourses();

async function getAllCourses() {
  // Once we have a seed file this can happen there
  // Presumably we wont want to sync if calling this periodically on the server
  await db.db.sync({ force: true });

  // First we take all the files missing, get their information, and create the file
  for (let file of listOfGets) {
    try{
      const currentAPI = apiInformation.filter(a => a.fileName === file)[0];
      const requestData = await makeApiRequest(currentAPI.info);
      
      // write the data out to a file so we don't have to do this so often
      // Maybe once a week or so?
      let filePath = path.join(__dirname, 'courseLists', file);
      await fs.writeFile(filePath, JSON.stringify(requestData),
			 (err) => { console.log("Created: ", file, " | Errors: ", err); });
    }
    catch(e) {
      console.log("Nick failed! ", e);
    }
  }

  // Now for all items in apiInformation we work out the database stuff
  // A function currently needs to be made for every api that we use because
  // they are all slightly different unfortunately.
  // Each API function should return the two arrays
  // One for the Topics, and one for the Courses
  for (let API of apiInformation) {
    // First lets make sure and get the Provider information done right
    // This needs to be complete before any of the courses are added to their own
    // Table because courses relies on the Provider ID
    const { info } = API;
    try {
      let provider = await db.Provider.findOrCreate({ where: { name: info.providerName, apikey: info.apikey }});
      const fileData = JSON.parse( await fs.readFileSync(path.join(__dirname, 'courseLists', API.fileName)));
      let { topics, courses } = info.func(fileData);
      // Now our courses relies on the topics having been created, so lets do that :)
      topics = await Promise.all(topics.map(t => db.Topic.create({name: t})));
      topics = topics.reduce((acc, t) => {
	acc[t.name] = t.id;
	return acc;
      }, {});
      // Finally. Lets make some courses
      await Promise.all(courses.map(c => {
	return db.Course.create({ ...c, topicId: topics[c.topic], providerId: provider[0].id });
      }));
    }
    catch(e) {
      console.log("Error working on create table rows: ", e);
    }
  }
//  db.db.close();
}

async function makeApiRequest(api) {
  // I think we can monitor the http request status as the download happens. Haven't figured
  // that out yet. Maybe Axios is not the right thing to use and we should just use node http
  // instead
  console.log("Fetching: ", api);
  const { data } = await axios.get(api.url, api.headers);
  return data;
}

function createKhanCourse(data) {
  const ignoreList = ["Partner content",
		      "Talks and interviews",
		      "College, careers, and more",
		      "Talent search",
		      "Resources",
		      "MAP Recommended Practice",
		      "kMAP",
		      "KA Educator"];
  const topics = [];
  const courses = [];
  for(let c of data.children) {
    if(ignoreList.includes(c.title))
      continue;
    if(!topics.includes(c.title))
      topics.push(c.title);
    
    for(let cc of c.children) {
      courses.push({ name: cc.title, link: cc.ka_url, topic: c.title});
    }
  }
  return { topics, courses };
}
