import { connect } from 'react-redux';
import CardGroup from '../../CardGroup/CardGroupDumb';

const mapStateToProps = ({ explore }) => {
  let items, noContentMessage;

  if (explore.category === 'Groups') {
    noContentMessage = 'There are no groups that meet your specifications.';

    items = explore.items.map(group => ({
      id: group.id,
      link: `/groups/${group.id}`,
      header: group.name,
      meta: `Members: ${group.users.length}`,
      description: group.description,
    }));
  } else if (explore.category === 'Events') {
    noContentMessage = 'There are no events that meet your specifications.';

    items = explore.items.map(({ event, attendeeCount }) => ({
      id: event.id,
      link: `/events/${event.id}`,
      header: event.name,
      meta: `Attendees: ${attendeeCount}`,
      description: event.description,
    }));
  }

  return { items, noContentMessage };
};

export default connect(mapStateToProps)(CardGroup);
