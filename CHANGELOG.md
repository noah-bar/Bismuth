# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.1.0] - 2025-12-31

### Added

- Add tabs to manage separate offer and invoice items in quotes
- Add auto-resize to quote item description textarea
- Add dynamic PDF download based on selected tab
- Add toast notification system with success messages
- Add password change functionality to profile page
- Add sanitizeFormData helper to handle null values in forms
- Add French translations for password change, validators, and back button
- Add form validation and safe email handling in login
- Add size prop and improve native-select styling
- Add configurable chromium path and optimize browser args for PDF generation

### Changed

- Split quote items template into separate offer and invoice templates
- Update models and validators for separate offer and invoice items
- Separate offer and invoice items in database schema

### Fixed

- Redirect to quote detail page after creation instead of index
- Use invoice totals for statistics calculations
- Ensure signature and icon fields override sanitized data in profile
- Prevent rendering iframes when content unavailable
- Add conditional rendering for optional user fields in PDF
- Allow nullable optional fields in profile validator
- Add default values and improve password reset handling
- Initialize form fields with default values to prevent errors
- Hide order number row when empty in invoice template
- Filter quotes by closed status instead of invoice date in statistics
- Change native select wrapper width from fit to full
- Add foreground color to select options and optgroups

## [1.0.2] - 2025-12-29

### Added

- Add custom style prop support with safe area handling to sidebar
- Add safe area padding for top and bottom insets to sidebar
- Add safe area support for notched devices in PWA

### Changed

- Remove unused ImageResizeOptions interface from services

### Fixed

- Handle null signature in base64 conversion for user
- Convert decimal fields to number for mysql compatibility in quote

## [1.0.1] - 2025-12-29

### Added

- Enhance HTML metadata and mobile support
- Migrate database from SQLite to MySQL

### Fixed

- Spread form data to prevent reactivity issues in company and contact forms
- Remove stray character from manifest link in layout

### Changed

- Replace better-sqlite3 with mysql2 dependency

## [1.0.0] - 2025-12-29

### Added

- Display app version in header
- Comprehensive project documentation (README.md)
- Create user CLI command
- Responsive layout for quote items table on mobile
- Validity period (30 days) for offers and payment terms (30 days) for invoices
- Monthly closed quotes chart with amounts visualization
- Year filter for quote statistics
- Statistics page with quote metrics cards (sent, accepted, completed, closed)
- Quote statistics aggregation service
- Statistics page and controller
- Quote delete functionality
- Noto Sans as default font family
- French translations for invoice PDF, quote steps, and statistics page
- Optional company field for quotes
- Drive integration for file management with Image service
- Multi-step workflow with order and invoice tabs for quotes
- Invoice generation endpoint
- Order file upload support
- Profile button to sidebar and profile edit functionality
- Bouncer for authorization
- Upload service for file management
- Company and contact fields to user model
- PDF download with loading state
- Offer endpoint with content negotiation for PDF generation
- PDF generation service with quote template
- Tabs component for offer, order, and invoice views
- Title and status badge to quote details page
- Row click navigation to quote details
- Default version to new quotes
- Status filter and badge with icons to quotes list
- Summary section with item count and total price
- Status field to quote form, data table, and enum
- Date formatting utility for European format
- Search and sort by company name and contact full name
- Support for relation columns in searchable and sortable mixins
- Quote management feature with CRUD operations
- Contact management feature with fullName computed field
- Checkbox, native-select, and switch UI components
- User relation to company model
- React UI with authentication and company features
- Authentication and company management backend
- Database and startup configuration
- AdonisJS project initialization

### Changed

- Format files with Prettier (backend, frontend, edge templates, manifest)
- Translate chart config label to French
- Update h2 to h3 for chart title in statistics
- Simplify inertia layout body classes
- Separate invoice and offer meta partials
- Update templates for async base64 methods
- Update User computed properties for Drive URLs
- Update ProfileService to use ImageService
- Migrate UploadService to use AdonisJS Drive
- Improve status badge switch statement
- Replace action buttons with shared dropdown menu component
- Disable firstName, lastName and email fields in profile
- Improve quote items table design with enhanced styling
- Display total with VAT and use new offer template
- Redesign offer template with new layout and styling
- Remove old quote template files
- Simplify quote template using partials and i18n
- Split quote template into reusable partials
- Convert images to base64 for PDF generation
- Center iframe and limit width to A4 format
- Use layout component for quote template
- Add PDF layout component
- Simplify PDF filename in Content-Disposition header
- Improve form layout and switch component sizing
- Standardize translation keys to camelCase
- Migrate company controller to use service layer

### Fixed

- Use primary color variable for chart bars
- Normalize email to lowercase on login
- Allow null companyId in Quote model
- Handle optional company in UI and PDF views
- Transform invoiceDate to DateTime in validators
- Prevent row click when clicking action buttons
- Resolve hydration mismatch in pagination component
- Center action buttons on mobile in quote items
- Display error message below form field instead of above
- Qualify column names with table prefix to avoid ambiguity
- Remove order by query in getContacts method
- Correct password field translation and add missing field labels
- Allow iframe embedding from same origin

### Chore

- Enable JSON module resolution in tsconfig
- Update package name and version to 0.1.0
- Add recharts for data visualization
- Add vite-plugin-pwa for PWA support
- PWA configuration with service worker and caching
- PWA manifest and robots.txt files
- Add enums path alias to package.json
- Apply code formatting and linting rules
- Add server entry point, tests, and static assets
- Add project configuration files
- Add radix-ui tabs dependency
- Add radix-ui checkbox and switch dependencies
- Add sharp package for image processing
- Add puppeteer dependency

[Unreleased]: https://github.com/hex-tech/bismuth/compare/v1.1.0...HEAD
[1.1.0]: https://github.com/hex-tech/bismuth/compare/v1.0.2...v1.1.0
[1.0.2]: https://github.com/hex-tech/bismuth/compare/v1.0.1...v1.0.2
[1.0.1]: https://github.com/hex-tech/bismuth/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/hex-tech/bismuth/releases/tag/v1.0.0
