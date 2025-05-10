// Chatbot Logic
const chatbotBox = document.getElementById("chatbotBox");
function toggleChatbot() {
  chatbotBox.style.display = chatbotBox.style.display === "flex" ? "none" : "flex";
}

let prompt = document.querySelector("#prompt");
let submitbtn = document.querySelector("#submit");
let chatContainer = document.querySelector("#chatContainer");
let imagebtn = document.querySelector("#image");
let image = document.querySelector("#image img");
let imageinput = document.querySelector("#image input");

const Api_Url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyDmadolQPNRZJ8p5T7y85t8UBFo4FqK5_Q";

let user = {  
  message: null,
  file: {
    mime_type: null,
    data: null
  }
};

async function generateResponse(aiChatBox) {
  let text = aiChatBox.querySelector(".ai-chat-area");
  let RequestOption = {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      "contents": [
        {
          "parts": [
            { text: user.message },
            ...(user.file.data ? [{ inline_data: user.file }] : [])
          ]
        }
      ]
    })
  };
  try {
    let response = await fetch(Api_Url, RequestOption);
    let data = await response.json();
    let apiResponse = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim();
    text.innerHTML = apiResponse;
  } catch (error) {
    console.log(error);
  } finally {
    chatContainer.scrollTop = chatContainer.scrollHeight;
    image.src = `img.svg`;
    image.classList.remove("choose");
    user.file = {};
  }
}

function createChatBox(html, classes) {
  let div = document.createElement("div");
  div.innerHTML = html;
  div.classList.add(classes);
  return div;
}

function handlechatResponse(userMessage) {
  user.message = userMessage;
  let html = `<div class="user-chat-area">${user.message}${user.file.data ? `<img src="data:${user.file.mime_type};base64,${user.file.data}" class="chooseimg" />` : ""}</div>`;
  prompt.value = "";
  let userChatBox = createChatBox(html, "user-chat-box");
  chatContainer.appendChild(userChatBox);
  chatContainer.scrollTop = chatContainer.scrollHeight;

  setTimeout(() => {
    let html = `<div class="ai-chat-area"><img src="loading.webp" alt="" class="load"></div>`;
    let aiChatBox = createChatBox(html, "ai-chat-box");
    chatContainer.appendChild(aiChatBox);
    generateResponse(aiChatBox);
  }, 600);
}

prompt.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    handlechatResponse(prompt.value);
  }
});

submitbtn.addEventListener("click", () => {
  handlechatResponse(prompt.value);
});

imageinput.addEventListener("change", () => {
  const file = imageinput.files[0];
  if (!file) return;
  let reader = new FileReader();
  reader.onload = (e) => {
    let base64string = e.target.result.split(",")[1];
    user.file = {
      mime_type: file.type,
      data: base64string
    };
    image.src = `data:${user.file.mime_type};base64,${user.file.data}`;
    image.classList.add("choose");
  };
  reader.readAsDataURL(file);
});

imagebtn.addEventListener("click", () => {
  imagebtn.querySelector("input").click();
});

// Hamburger menu
const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

// Animated search bar
  function searchCourse() {
    const query = document.getElementById("searchInput").value.trim();
    if (query) {
      alert("Searching for: " + query);
      // You can redirect or implement actual search logic here
    } else {
      alert("Please enter a course to search.");
    }
  }

// Focus on your goals
const goalList = document.getElementById("goal-list");
  const newGoalInput = document.getElementById("new-goal");
  const addGoalBtn = document.getElementById("add-goal-btn");
  const completedCount = document.getElementById("completed-count");

  // Update completed goals
  function updateCompletedCount() {
    const checkboxes = document.querySelectorAll(".goal-check");
    let count = 0;
    checkboxes.forEach(check => {
      const span = check.nextElementSibling;
      if (check.checked) {
        span.classList.add("checked-goal");
        count++;
      } else {
        span.classList.remove("checked-goal");
      }
    });
    completedCount.textContent = count;
  }

  // Bind events to checkboxes
  function bindCheckboxEvents() {
    const checkboxes = document.querySelectorAll(".goal-check");
    checkboxes.forEach(checkbox => {
      checkbox.addEventListener("change", updateCompletedCount);
    });
  }

  // Add new goal
  addGoalBtn.addEventListener("click", () => {
    const goalText = newGoalInput.value.trim();
    if (goalText !== "") {
      const newLi = document.createElement("li");
      newLi.innerHTML = `<input type="checkbox" class="goal-check"> <span>${goalText}</span>`;
      goalList.appendChild(newLi);
      newGoalInput.value = "";
      bindCheckboxEvents();
      updateCompletedCount();
    }
  });

  // Initial setup
  bindCheckboxEvents();
  updateCompletedCount();

  // ========== Achievement section ==========
  const addAchievementBtn = document.getElementById("add-achievement-btn");
  const newAchievementTitle = document.getElementById("new-achievement-title");
  const newAchievementDesc = document.getElementById("new-achievement-desc");
  const achievementsList = document.getElementById("achievements-list");

  // Add Achievement
  addAchievementBtn.addEventListener("click", () => {
    const title = newAchievementTitle.value.trim();
    const desc = newAchievementDesc.value.trim();

    if (title !== "" && desc !== "") {
      const newAchievement = document.createElement("div");
      newAchievement.classList.add("achievement-wrapper");

      newAchievement.innerHTML = `
        <span class="close-btn">❌</span>
        <div class="achievement-card">
          <h3>${title}</h3>
          <p>${desc}</p>
        </div>
      `;

      achievementsList.appendChild(newAchievement);

      newAchievementTitle.value = "";
      newAchievementDesc.value = "";
    }
  });

  // Delete Achievement using Event Delegation
  achievementsList.addEventListener("click", (e) => {
    if (e.target.classList.contains("close-btn")) {
      e.target.parentElement.remove();
    }
  });

// FAQ Section
  const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');

      question.addEventListener('click', () => {
        // Close all items
        faqItems.forEach(i => {
          if (i !== item) i.classList.remove('active');
        });

        // Toggle current item
        item.classList.toggle('active');
      });
    });