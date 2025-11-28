const { validateRegistration } = require("../utils/validation");
const eventsServices = require("./eventsServices");

let registrations = [];
let currentId = 1; // auto-increment

// 1. REGISTER a user for an event
async function register(userId, eventId) {
  const error = validateRegistration({ userId, eventId });
  if (error) return { error };

  // Fetch event correctly (async)
  const event = await eventsServices.getEventById(eventId);
  if (event.error) return { error: "Event does not exist" };

  // Check if already registered
  const alreadyRegistered = registrations.find(
    r => r.userId === String(userId) && r.eventId === Number(eventId)
  );
  if (alreadyRegistered) return { error: "User already registered for this event" };

  // Check capacity
  if ((event.registrations || 0) >= event.capacity) {
    return { error: "Event is full" };
  }

  // Create registration
  const registration = {
    id: currentId++,
    userId: String(userId),
    eventId: Number(eventId)
  };

  registrations.push(registration);

  // Increment event registration count
  event.registrations = (event.registrations || 0) + 1;

  return { success: true, registration };
}

// 2. UNREGISTER a user
async function unregister(userId, eventId) {
  const index = registrations.findIndex(
    r => r.userId === String(userId) && r.eventId === Number(eventId)
  );

  if (index === -1) return { error: "User not registered for this event" };

  registrations.splice(index, 1);

  // Decrease event registration count
  const event = await eventsServices.getEventById(eventId);

  if (!event.error && event.registrations > 0) {
    event.registrations--;
  }

  return { success: true };
}

// 3. LIST registrations for an event
function listRegistrationsByEvent(eventId) {
  return registrations.filter(r => r.eventId === Number(eventId));
}

// 4. LIST registrations for a user
function listRegistrationsByUser(userId) {
  return registrations.filter(r => r.userId === String(userId));
}

// EXPORT FUNCTIONS
module.exports = {
  register,
  unregister,
  listRegistrationsByEvent,
  listRegistrationsByUser
};
