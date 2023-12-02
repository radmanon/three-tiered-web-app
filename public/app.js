// AJAX call to retrieve user timeline data
const userId = '1'; // Replace with the actual user ID
$.ajax({
  url: `http://localhost:8000/timeline/${userId}`,
  method: 'GET',
  success: function (data) {
    // Handle the retrieved data and update the UI
    displayUserTimeline(data);
  },
  error: function (error) {
    console.error('Error retrieving user timeline:', error);
  },
});

// Function to display user timeline data on the page
function displayUserTimeline(data) {
  const userTimelineDiv = $('#userTimeline');

  // Clear existing content
  userTimelineDiv.empty();

  // Iterate through the retrieved data and append to the page
  data.forEach(post => {
    const postDiv = $('<div>');
    postDiv.append(`<p><strong>User:</strong> ${post.user_name}</p>`);
    postDiv.append(`<p><strong>Date:</strong> ${post.date_of_post}</p>`);
    postDiv.append(`<p><strong>Text:</strong> ${post.text_post}</p>`);
    postDiv.append(`<p><strong>Time:</strong> ${post.time_of_post}</p>`);
    postDiv.append(`<p><strong>Views:</strong> ${post.views}</p>`);
    postDiv.append('<hr>');
    
    userTimelineDiv.append(postDiv);
  });
}
