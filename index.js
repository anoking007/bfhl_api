const express = require('express');
const bodyParser = require('body-parser');


const app = express();
const port =  3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.status(200).json({
    message: "Welcome to the BFHL API. Use the POST /bfhl route."
  });
});


app.post('/bfhl', (req, res) => {
  try {
   
    const inputData = req.body.data;

    // Validate that the input is a non-empty array
    if (!Array.isArray(inputData) || inputData.length === 0) {
      return res.status(400).json({
        is_success: false,
        user_id: "john_doe_17091999", // Placeholder
        message: "Invalid input. 'data' must be a non-empty array."
      });
    }

    // Initialize arrays and variables to store the processed data
    const oddNumbers = [];
    const evenNumbers = [];
    const alphabets = [];
    const specialCharacters = [];
    let sum = 0;
    let concatenatedAlphabets = '';

    // Iterate through each item in the input array
    inputData.forEach(item => {
      // Check if the item is a number (string representation of a number)
      if (!isNaN(item) && item.trim() !== '') {
        const num = parseInt(item, 10);
        sum += num;
        // Check if the number is even or odd and add it to the corresponding array
        if (num % 2 === 0) {
          evenNumbers.push(item);
        } else {
          oddNumbers.push(item);
        }
      } 
      // Check if the item is an alphabet
      else if (item.match(/^[a-zA-Z]$/)) {
        alphabets.push(item.toUpperCase());
        concatenatedAlphabets += item;
      } 
      // If it's not a number or a single alphabet, treat it as a string
      else if (typeof item === 'string') {
        let isOnlyAlpha = true;
        let isOnlySpecial = true;

        for (const char of item) {
            if (char.match(/^[a-zA-Z]$/)) {
                alphabets.push(char.toUpperCase());
                concatenatedAlphabets += char;
                isOnlySpecial = false;
            } else if (!isNaN(char)) {
                isOnlyAlpha = false;
                isOnlySpecial = false;
            } else {
                specialCharacters.push(char);
                isOnlyAlpha = false;
            }
        }
      }
    });

    // Process the concatenated alphabet string for reverse order and alternating caps
    let finalString = concatenatedAlphabets.split('').reverse().map((char, index) => {
      if (index % 2 === 0) {
        return char.toUpperCase();
      } else {
        return char.toLowerCase();
      }
    }).join('');

    // Construct the final JSON response object
    const response = {
      is_success: true,
      user_id: "john_doe_17091999", // Replace with your actual user ID
      email: "john@xyz.com", // Replace with your actual email
      roll_number: "ABCD123", // Replace with your actual roll number
      odd_numbers: oddNumbers,
      even_numbers: evenNumbers,
      alphabets: alphabets,
      special_characters: specialCharacters,
      sum: sum.toString(),
      concat_string: finalString,
    };

    // Send the JSON response with a 200 status code
    res.status(200).json(response);

  } catch (error) {
    // Log the error and send a 500 status code for internal server errors
    console.error(error);
    res.status(500).json({
      is_success: false,
      user_id: "john_doe_17091999",
      message: "An internal server error occurred."
    });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});