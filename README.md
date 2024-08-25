# 📚 AI Rate My Professor

Welcome to the **AI Rate My Professor** project! This application provides an intelligent way to find, review, and analyze professors based on data from Rate My Professor. Using cutting-edge technologies like Pinecone, vector embeddings, and AI, this project offers a seamless user experience for students seeking information about their professors.

## 🌟 Features

- **User Submissions**: Users can submit links to professors' pages on Rate My Professor, which are then automatically scraped.
- **Data Storage**: All relevant data is stored in Pinecone for efficient search and retrieval.
- **Advanced Search**: Users can perform personalized searches to receive tailored professor recommendations based on various criteria.
- **Sentiment Analysis**: Integration of sentiment analysis to provide insights into changes in professor ratings and review sentiments over time.

## 🚀 Getting Started

### Prerequisites

- **Node.js**: Ensure you have Node.js installed. Download from [here](https://nodejs.org/).
- **Pinecone API Key**: Sign up at [Pinecone](https://www.pinecone.io/) and obtain your API key.
- **Next.js**: This project uses Next.js for server-side rendering and React framework.
- **Hugging Face API Key**: Sign up at [Hugging Face](https://huggingface.co/) to use their models for generating embeddings.

### Installation

1. **Clone the repository**:

    ```bash
    git clone https://github.com/yourusername/ai-rate-my-prof.git
    cd ai-rate-my-prof
    ```

2. **Install dependencies**:

    ```bash
    npm install @emotion/react@^11.13.0 @emotion/styled@^11.13.0 @google/generative-ai@^0.17.1 @huggingface/inference@^2.8.0 @mui/icons-material@^5.16.7 @mui/material@^5.16.7              @pinecone-database/pinecone@^3.0.1 @vercel/analytics@^1.3.1 framer-motion@^11.3.30 next@14.2.5 node-fetch@^3.3.2 openai@^4.56.0 react@^18 react-dom@^18
    ```

3. **Set up environment variables**:

   Create a `.env.local` file in the root directory and add the following:

    ```env
    PINECONE_API_KEY=your_pinecone_api_key
    HUGGINGFACE_API_TOKEN=your_huggingface_api_key
    GEMINI_API_KEY=your_gemini_api_key
    ```

4. **Run the development server**:

    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🛠 Technologies Used

- **Next.js**: A React framework for building server-side rendering and static web applications.
- **React**: A JavaScript library for building user interfaces.
- **Pinecone**: Vector database for fast search and retrieval of data.
- **Hugging Face Transformers**: Used for generating embeddings and natural language processing tasks.
- **MUI (Material-UI)**: A popular React UI framework for building responsive, modern interfaces.
- **Cheerio**: A fast, flexible, and lean implementation of core jQuery designed specifically for the server.
- **Axios**: A promise-based HTTP client for the browser and Node.js.
- **Node.js**: JavaScript runtime built on Chrome's V8 JavaScript engine.

## 📂 Project Structure

- **/app**: Contains the main application components, including the layout and various pages.
- **/pages**: Directory for different pages of the application, such as upload, chat, and reviews.
- **/components**: Reusable React components used throughout the application.
- **/api**: Contains server-side functions for handling data requests, including scraping and interacting with Pinecone.
- **/data**: Directory for storing local data files like `reviews.json`.

## 📊 Analytics

- Integrated with Vercel Analytics for tracking user interactions and insights.

## 🎨 UI/UX

- **Modern Design**: Using Material-UI for sleek, responsive components.
- **Intuitive Navigation**: Easy-to-use navigation bar and clear calls-to-action.
- **Interactive Elements**: Dynamic filtering and sorting options for reviewing professor ratings.

## 💡 Future Enhancements

- **Integration with More Data Sources**: Expand beyond Rate My Professor for a more comprehensive dataset.
- **Enhanced Sentiment Analysis**: Implement deeper insights into review trends and sentiments over time.
- **User Authentication**: Secure user accounts for personalized experiences and review submissions.

## 📝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes. For major changes, please open an issue first to discuss what you would like to change.

## 🌐 Links

- **Live Demo**: [AI Rate My Professor]((https://ai-rate-my-prof-one.vercel.app/)
- **GitHub Repository**: [GitHub - AI Rate My Professor](https://github.com/mbouabid25/ai-rate-my-prof)

## 📬 Contact

For any inquiries or feedback, feel free to reach out to us via email.

---

Made with ❤️ by Marwa Bouabid, Aisha Deejay, Smit Lila and Joan Guzman