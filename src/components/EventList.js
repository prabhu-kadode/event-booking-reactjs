const EventList = ({event,token}) => {
    return (
        <div className="event-list">
            <p>
                <b>{event.title}</b>
            </p>
            <p>
            <b>{event.description}</b>
            </p>
            <p>
                <button>View Details</button>
               {event.creator.email===token.login.email ? 'Your are the owner' : <button>Book Event</button>}
            </p>
            <p>Created By {event.creator.email}</p>
        </div>
    )
}

export default EventList;