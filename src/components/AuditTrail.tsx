import { mockAuditEvents } from '../lib/data';

export default function AuditTrail() {
  const events = mockAuditEvents;

  const formatTimestamp = (ts: string) => {
    const date = new Date(ts);
    return {
      date: date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
      time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    };
  };

  const actionIcon = (action: string): string => {
    if (action.includes('Created')) return '\u{1F4DD}';
    if (action.includes('Edited') || action.includes('Variables')) return '\u{270F}';
    if (action.includes('Added')) return '\u{2795}';
    if (action.includes('Sent')) return '\u{1F4E8}';
    if (action.includes('Viewed')) return '\u{1F441}';
    if (action.includes('Signed')) return '\u{270D}';
    if (action.includes('Executed')) return '\u{2705}';
    if (action.includes('Exported')) return '\u{1F4E5}';
    if (action.includes('Reminder')) return '\u{1F514}';
    return '\u{1F4CB}';
  };

  // Group events by date
  const grouped = events.reduce<Record<string, typeof events>>((acc, event) => {
    const { date } = formatTimestamp(event.timestamp);
    if (!acc[date]) acc[date] = [];
    acc[date].push(event);
    return acc;
  }, {});

  return (
    <div className="audit-trail">
      <div className="audit-trail__header">
        <h2>Audit Trail</h2>
        <p className="audit-trail__subtitle">Complete chronological record of all contract actions</p>
      </div>

      <div className="audit-trail__contract-label">
        <span className="audit-trail__contract-badge">Acme Corp NDA</span>
        <span className="audit-trail__event-count">{events.length} events</span>
      </div>

      <div className="audit-trail__timeline" data-testid="audit-timeline">
        {Object.entries(grouped).map(([date, dateEvents]) => (
          <div key={date} className="audit-trail__day">
            <div className="audit-trail__date-marker">{date}</div>
            <div className="audit-trail__events">
              {dateEvents.map(event => {
                const { time } = formatTimestamp(event.timestamp);
                return (
                  <div key={event.id} className="audit-event" data-testid={`audit-event-${event.id}`}>
                    <div className="audit-event__line" />
                    <div className="audit-event__dot" />
                    <div className="audit-event__content">
                      <div className="audit-event__top">
                        <span className="audit-event__icon">{actionIcon(event.action)}</span>
                        <span className="audit-event__action">{event.action}</span>
                        <span className="audit-event__time">{time}</span>
                      </div>
                      <div className="audit-event__actor">{event.actor}</div>
                      {event.details && (
                        <div className="audit-event__details">{event.details}</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
