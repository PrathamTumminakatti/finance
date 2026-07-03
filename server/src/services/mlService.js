import axios from 'axios';

export const analyzeTransaction = async (data) => {
  try {
    const baseURL = process.env.ML_SERVICE_URL;

    if (!baseURL) {
      throw new Error("ML_SERVICE_URL is not defined in environment");
    }

    const res = await axios.post(
      `${baseURL.replace(/\/$/, "")}/analyze`,
      data
    );

    return res.data;

  } catch (error) {
    console.error("ML Service Error:", error.message);
    throw new Error("Failed to analyze transaction");
  }
};