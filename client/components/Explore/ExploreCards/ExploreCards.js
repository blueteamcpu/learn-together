import { connect } from 'react-redux';
import CardGroup from '../../CardGroup/CardGroupDumb';

const mapStateToProps = ({ explore }) => {
  let items;

  if (explore.category === 'Groups') {
    items = explore.items.map(({ group, memberCount }) => ({
      id: group.id,
      link: `/groups/${group.id}`,
      header: group.name,
      meta: `Members: ${memberCount}`,
      description: group.description,
    }));
  } else if (explore.category === 'Events') {
    items = explore.items.map(({ event, attendeeCount }) => ({
      id: event.id,
      link: `/events/${event.id}`,
      header: event.name,
      meta: `Attendees: ${attendeeCount}`,
      description: event.description,
    }));
  }

  return { ...explore, items };
};

export default connect(mapStateToProps)(CardGroup);
