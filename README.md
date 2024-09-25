# NDJSON File Upload and Display App with Full-Text Search

This is a Next.js application that allows users to upload NDJSON (Newline Delimited JSON) files, displays the data in a tabular format, and includes full-text search functionality (planned feature).

## Features

- Upload NDJSON file via a form.
- Parse and display the contents in a dynamic table using ShadCN components.
- Future: Perform full-text search on the content of the uploaded file.

## Tech Stack

- **Next.js**: React framework for server-side rendering and API routing.
- **ShadCN**: A component library for building responsive user interfaces.
- **Multer**: Middleware for handling file uploads in Node.js.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo/ndjson-upload-app.git
   cd ndjson-upload-app
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

## Project Structure

```plaintext
.
├── pages
│   ├── api
│   │   └── upload.js   # API route for handling file uploads
│   ├── index.js        # Frontend form and table display
├── public              # Public assets
├── styles              # Global styles
└── README.md           # Project documentation
```

## API Routes

- `POST /api/upload`: This route handles file uploads. It accepts an NDJSON file, parses it into an array of JSON objects, and returns the data.

## Usage

1. **Upload NDJSON File**:
   - Navigate to the homepage.
   - Use the file input to select an NDJSON file from your local system.
   - Click the "Upload" button to send the file to the server for processing.
   - The content of the file will be displayed in a table.

2. **Future**: Full-text search will allow users to search through the displayed content.

## Development

To contribute or extend this app, follow these steps:

1. Clone the repository and install dependencies.
2. Modify the code in `pages/index.js` to adjust the frontend or `pages/api/upload.js` for backend logic.
3. Run the app locally to see changes.

### Extending Full-Text Search

The next phase of the project will add a full-text search functionality. This will involve:
- Indexing the data from the uploaded NDJSON file.
- Implementing a search bar on the frontend.
- Returning filtered results based on the search input.

## License

This project is open source and available under the [MIT License](LICENSE).
