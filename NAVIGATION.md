# Navigation Structure Documentation

## Overview
The app uses React Navigation with role-based routing to provide separate flows for students and administrators.

## Navigation Architecture

### Root Navigator
- **Purpose**: Determines which flow to show based on user authentication and role
- **Routes**:
  - `Auth` - Login screen (shown when user is not authenticated)
  - `StudentApp` - Student flow (shown when user is authenticated and not admin)
  - `AdminApp` - Admin flow (shown when user is authenticated and is admin)

### Student Flow (Bottom Tab Navigator)
Three tabs with nested stack navigation:

#### 1. Events Tab
- **EventList** - Shows all available events
- **EventDetails** - Shows details of a specific event (receives `eventId` param)

#### 2. My Events Tab
- **MyEventsList** - Shows events user has registered for or marked as interested
- **EventDetails** - Shows details of a specific event (receives `eventId` param)

#### 3. My Day Tab
- **MyDayList** - Shows events happening today that user is registered/interested in
- **EventDetails** - Shows details of a specific event (receives `eventId` param)

### Admin Flow (Stack Navigator)
- **AdminEventList** - List of all events with management options (initial screen)
- **AdminEventForm** - Create new event or edit existing event (receives optional `eventId` param)
- **AdminParticipants** - View participants for a specific event (receives `eventId` param)

## Navigation Params Convention

All navigation uses **lightweight params** - only IDs are passed, not full objects.

### Event Details Navigation
```javascript
navigation.navigate('EventDetails', { eventId: 'event-123' });
```

### Admin Event Form Navigation
```javascript
// Create new event
navigation.navigate('AdminEventForm');

// Edit existing event
navigation.navigate('AdminEventForm', { eventId: 'event-123' });
```

### Admin Participants Navigation
```javascript
navigation.navigate('AdminParticipants', { eventId: 'event-123' });
```

## Helper Functions

The `AppNavigator.js` exports helper functions for common navigation patterns:

### navigateToEventDetails
```javascript
import { navigateToEventDetails } from './src/navigation/AppNavigator';

// In your component
const handleEventPress = (eventId) => {
  navigateToEventDetails(navigation, eventId);
};
```

### navigateToAdminEventForm
```javascript
import { navigateToAdminEventForm } from './src/navigation/AppNavigator';

// Create new event
navigateToAdminEventForm(navigation);

// Edit existing event
navigateToAdminEventForm(navigation, eventId);
```

### navigateToAdminParticipants
```javascript
import { navigateToAdminParticipants } from './src/navigation/AppNavigator';

navigateToAdminParticipants(navigation, eventId);
```

## Accessibility

All navigators and screens include `accessibilityLabel` attributes:

- Root Navigator: `nav-root`
- Student Tabs: `nav-student-tabs`
- Admin Stack: `nav-admin-stack`
- Events Stack: `nav-events-stack`
- My Events Stack: `nav-my-events-stack`
- My Day Stack: `nav-my-day-stack`
- Individual screens: `{screen-name}-screen` (e.g., `event-list-screen`)
- Tab buttons: `tab-{name}` (e.g., `tab-events`)

## User Context Integration

The navigation uses the `UserContext` to determine the current user and their role:

```javascript
const { user } = useUser();

// user structure:
// {
//   id: string,
//   name: string,
//   isAdmin: boolean
// }
```

### Switching Between Flows

To test different flows, update the user in UserContext:

```javascript
// Login as student
login({ id: '1', name: 'John Doe', isAdmin: false });

// Login as admin
login({ id: '2', name: 'Admin User', isAdmin: true });

// Logout (shows auth screen)
logout();
```

## Screen Titles

- **Student Flow**:
  - All Events
  - My Events
  - My Day
  - Event Details

- **Admin Flow**:
  - Manage Events
  - Create Event / Edit Event (dynamic based on params)
  - Event Participants

## Deep Linking Support

The navigation structure is ready for deep linking. Event IDs can be passed via URL params to directly open specific events.

Example deep link patterns:
- `app://event/{eventId}` → EventDetails
- `app://admin/event/{eventId}/edit` → AdminEventForm
- `app://admin/event/{eventId}/participants` → AdminParticipants

## Best Practices

1. **Always pass IDs, not objects** - Keep navigation params lightweight
2. **Fetch data in screens** - Use the eventId param to fetch event data from context/service
3. **Use helper functions** - Prefer exported helper functions over direct navigation calls
4. **No business logic in navigator** - Keep navigation files declarative
5. **Consistent naming** - Use clear, descriptive route names

## Testing Navigation

To test the navigation flows:

1. Start the app - you'll see the Auth screen
2. Implement login in AuthScreen to set user with `isAdmin: false` to test student flow
3. Implement login in AuthScreen to set user with `isAdmin: true` to test admin flow
4. Navigate between screens to verify all routes work correctly
