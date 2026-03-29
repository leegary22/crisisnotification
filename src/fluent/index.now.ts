import '@servicenow/sdk/global';

// Import all table definitions
import './tables/crisis-notification.now.ts';
import './tables/notification-recipient.now.ts';
import './tables/notification-template.now.ts';
import './tables/teams-config.now.ts';

// Import REST APIs
import './rest-apis/crisis-notification-api.now.ts';

// Import business rules
import './business-rules/notification-rules.now.ts';
import './business-rules/workflow-automation-rules.now.ts';

// Import UI pages
import './ui-pages/crisis-notification-management.now.ts';
import './ui-pages/teams-setup.now.ts';
import './ui-pages/notification-dashboard.now.ts';

// Import roles
import './roles/crisis-notification-roles.now.ts';

// Import ACLs
import './acls/crisis-notification-acls.now.ts';

// Import application menus
import './menus/crisis-notification-menu.now.ts';