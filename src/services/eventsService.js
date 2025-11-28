
const { validateEvent } = require("../utils/validation");
const { toISO } = require("../utils/dateUtils");

let events = [];
let nextId = 1;

// CREATE EVENT
async function createEvent(data) {
  const validationError = validateEvent(data);
  if (validationError) {
    return { error: validationError };
  }

  try {
    const newEvent = {
      id: nextId++,
      title: data.title,
      description: data.description || "",
      startAt: new Date(data.startAt),
      endAt: new Date(data.endAt),
      capacity: data.capacity || 100
    };

    events.push(newEvent);

    return newEvent;
  } catch (err) {
    console.error("CreateEvent Error:", err);
    return { error: "Failed to create event" };
  }
}

// GET EVENT BY ID
async function getEventById(id) {
  try {
    const event = events.find(e => e.id === Number(id));

    if (!event) {
      return { error: "Event not found" };
    }

    return event;
  } catch (err) {
    console.error("GetEventById Error:", err);
    return { error: "Error fetching event" };
  }
}

// LIST ALL EVENTS
async function listEvents() {
  try {
    // sort by startAt ascending
    const sorted = [...events].sort((a, b) => a.startAt - b.startAt);
    return sorted;
  } catch (err) {
    console.error("ListEvents Error:", err);
    return { error: "Error fetching events" };
  }
}

// UPDATE EVENT
async function updateEvent(id, updates) {
  try {
    const index = events.findIndex(e => e.id === Number(id));

    if (index === -1) {
      return { error: "Event not found" };
    }

    const existing = events[index];

    const updatedEvent = {
      ...existing,
      ...updates,
      startAt: updates.startAt ? new Date(updates.startAt) : existing.startAt,
      endAt: updates.endAt ? new Date(updates.endAt) : existing.endAt
    };

    events[index] = updatedEvent;

    return updatedEvent;
  } catch (err) {
    console.error("UpdateEvent Error:", err);
    return { error: "Error updating event" };
  }
}


// DELETE EVENT
async function deleteEvent(id) {
  try {
    const index = events.findIndex(e => e.id === Number(id));

    if (index === -1) {
      return { error: "Event not found" };
    }

    events.splice(index, 1);

    return { success: true };
  } catch (err) {
    console.error("DeleteEvent Error:", err);
    return { error: "Error deleting event" };
  }
}


module.exports = {
  createEvent,
  getEventById,
  listEvents,
  updateEvent,
  deleteEvent
};
