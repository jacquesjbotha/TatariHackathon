using Microsoft.AspNetCore.Mvc;
using System.Text;
using webapi;

namespace webapi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GPTController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<GPTController> _logger;

        public GPTController(ILogger<GPTController> logger)
        {
            _logger = logger;
        }
               

        [HttpPost(Name = "InitialTriage")]
        public async Task<GptResponse> PostAsync(string patientName="Ben", int age=35, string gender="Male", string symtoms="Headache") //string subject="2x2 digit multiplication"
        {
            // Set your OpenAI API credentials
            string apiKey = "";
            string modelId = "gpt-3.5-turbo";


            // Set the prompt for the conversation
            string systemPrompt = "You are a medical doctor";
            string prompt = $"I am a {age} year old {gender}. I have the following symtoms: {symtoms}. What questions would a doctor ask me to help diagnose my condition?" ;
           
            // Create an HTTP client
            using (var client = new HttpClient())
            {
                // Set the API endpoint and headers
                string endpoint = $"https://api.openai.com/v1/chat/completions";
                client.DefaultRequestHeaders.Add("Authorization", $"Bearer {apiKey}");
                //client.DefaultRequestHeaders.Add("Content-Type", "application/json");

                // Create the request payload
                var requestBody = new
                {
                    model = modelId,
                    messages = new[]
                    {
                    new { role = "system", content = systemPrompt },
                    new { role = "user", content = prompt }
                }
                };

                // Convert the payload to JSON
                var json = Newtonsoft.Json.JsonConvert.SerializeObject(requestBody);
                var content = new StringContent(json, Encoding.UTF8, "application/json");

                // Send the API request
                var response = await client.PostAsync(endpoint, content);
                var responseJson = await response.Content.ReadAsStringAsync();

                // Parse the response
                dynamic responseData = Newtonsoft.Json.JsonConvert.DeserializeObject(responseJson);
                string reply = responseData.choices[0].message.content;

                // Display the model's reply
                Console.WriteLine("Model's reply: " + reply);

                return new GptResponse
                {
                    TriageResponse = reply
                };
            }
        }
    }
}
