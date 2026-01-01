# Bismuth

A modern quote management system built with AdonisJS 6 and React 19. Bismuth helps businesses create, manage, and track quotes, generate professional PDF documents, and analyze sales statistics.

## Features

- **Quote Management**: Create, edit, and manage quotes with multiple statuses (draft, sent, accepted, rejected, completed, closed)
- **Separate Offer & Invoice Items**: Manage different items for offers and invoices independently with tabbed interface
- **Company & Contact Management**: Organize clients with company and contact information
- **PDF Generation**: Generate professional offers and invoices with customizable templates and dynamic download
- **Statistics Dashboard**: Track quote performance with interactive charts and metrics
- **User Profiles**: Manage company information, signatures, logos, and password change functionality
- **Toast Notifications**: Real-time feedback with success and error notifications
- **Progressive Web App**: Install and use as a native app on mobile and desktop
- **Responsive Design**: Optimized for mobile, tablet, and desktop devices
- **Internationalization**: French language support with i18n

## Tech Stack

### Backend

- **Framework**: AdonisJS v6 with TypeScript
- **Database**: MySQL with Lucid ORM
- **Authentication**: Session-based auth with remember me tokens
- **Validation**: VineJS for request validation
- **PDF Generation**: Puppeteer with Edge.js templates

### Frontend

- **Framework**: React 19 with TypeScript
- **Rendering**: Inertia.js for server-side rendering
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI primitives (Dialog, Dropdown, Tabs, etc.)
- **Icons**: Lucide React
- **Charts**: Recharts for data visualization
- **Notifications**: Sonner for toast notifications
- **Theme**: Dark mode support with next-themes

### Development Tools

- **Build Tool**: Vite 6
- **Testing**: Japa test runner
- **Code Quality**: ESLint, Prettier
- **Type Checking**: TypeScript 5.8

## Prerequisites

- Node.js >= 20.x
- npm or yarn or bun
- MySQL >= 8.0

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd Bismuth
```

2. Install dependencies:

```bash
npm install
```

3. Create a MySQL database:

```bash
mysql -u root -p
CREATE DATABASE app;
```

4. Configure environment:

```bash
cp .env.example .env
```

Edit `.env` and configure your MySQL connection:

```env
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_DATABASE=app
```

5. Generate application key:

```bash
node ace generate:key
```

6. Run database migrations:

```bash
node ace migration:run
```

7. Create a user account:

```bash
node ace create:user <firstName> <lastName> <email> [password]
```

Example:

```bash
node ace create:user John Doe john@example.com mypassword
```

If password is omitted, a random password will be generated and displayed.

8. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3333`

## Environment Variables

Configure these variables in your `.env` file:

```env
TZ=UTC
PORT=3333
HOST=localhost
LOG_LEVEL=info
APP_KEY=<generated-key>
NODE_ENV=development
SESSION_DRIVER=cookie
DRIVE_DISK=fs
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_DATABASE=app
CHROMIUM_PATH=<optional-custom-chromium-path>
```

**Optional Configuration:**

- `CHROMIUM_PATH`: Custom path to Chromium executable for PDF generation (defaults to Puppeteer's bundled Chromium if not set)

## Available Scripts

- `npm run dev` - Start development server with hot module replacement
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm test` - Run tests
- `npm run lint` - Lint code with ESLint
- `npm run format` - Format code with Prettier
- `npm run typecheck` - Type check with TypeScript

## Project Structure

```
Bismuth/
├── app/
│   ├── controllers/    # HTTP controllers
│   ├── models/         # Database models (User, Quote, Company, Contact)
│   ├── services/       # Business logic services
│   ├── validators/     # Request validators
│   ├── middleware/     # HTTP middleware
│   └── enums/          # TypeScript enums
├── database/
│   └── migrations/     # Database migrations
├── inertia/
│   ├── app/            # React app entry points
│   ├── pages/          # Inertia pages (Login, Quotes, Statistics, etc.)
│   ├── features/       # Feature-based components
│   ├── components/     # Shared UI components
│   └── types/          # TypeScript types
├── resources/
│   ├── views/          # Edge.js templates (PDF generation)
│   └── lang/           # Internationalization files
├── public/             # Static assets
└── start/
    └── routes.ts       # Route definitions
```

## Key Features Explained

### Quote Management

Quotes support multiple statuses throughout their lifecycle:

- **Draft**: Initial creation
- **Sent**: Sent to client
- **Accepted**: Client accepted the quote
- **Rejected**: Client rejected the quote
- **Completed**: Work completed
- **Closed**: Invoice sent and paid

Each quote can have separate items for offers and invoices, allowing you to:

- Create an initial offer with specific items and pricing
- Modify invoice items independently when work is completed
- Sync invoice items from offer with one click
- Track both offer and invoice totals separately

### PDF Generation

Generate professional documents:

- **Offers**: Quote details with validity period (30 days)
- **Invoices**: Invoice with payment terms (30 days)
- Responsive layout for mobile viewing
- Customizable with company logo and signature
- Automatic calculation of totals with and without VAT

### Statistics Dashboard

Track business performance:

- Count and total amount for sent, accepted, completed, and closed quotes
- Monthly breakdown of closed quotes with bar charts
- Filter by year
- Export data visualization

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

UNLICENSED - Private project

## Support

For issues and questions, please open an issue in the repository.
