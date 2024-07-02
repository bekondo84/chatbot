<template>
  <div class="container">
    <div class="main-content">
      <div class="chat-container">
        <div class="chat-box">
          <div class="bot-message-container">
            <div class="message-bot">
              <span class="message-bot-icon"
                ><font-awesome-icon icon="fa-solid fa-snowflake"
              /></span>
              <span>Hello! How can I help you today?</span>
              <div class="message-bot-footer">
                <span class="message-bot-btn">
                  <button title="copy">
                    <font-awesome-icon icon="fa-solid fa-copy" />
                  </button>
                </span>
                <span class="message-bot-btn">
                  <button title="regenerated">
                    <font-awesome-icon icon="fa-solid fa-arrows-spin" />
                  </button>
                </span>
                <span class="message-bot-btn">
                  <button title="bad anwser">
                    <font-awesome-icon icon="fa-solid fa-thumbs-down" />
                  </button>
                </span>
              </div>
            </div>
          </div>
          <div class="user-message-container">
            <span class="message-user"
              >Please can you tell me who is the general manager of PAK</span
            >
          </div>
        </div>
        <div class="input-container">
          <div class="user-input">
            <button class="file-button">
              <font-awesome-icon icon="fa-solid fa-paperclip" />
            </button>
            <textarea placeholder="Type a message..."></textarea>
            <button class="send-button">
              <font-awesome-icon icon="fa-solid fa-play" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup></script>
<style lang="scss" scoped>
.container {
  display: flex;
  flex: 1;
}

.main-content {
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
  margin: 10px 50px 10px 50px;
  transition: margin-left 0.3s ease;
  //border: solid 1px green;
}

.chat-container {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  background: white;

  // border: solid 1px red;
}

.chat-box {
  padding: 20px;
  overflow-y: auto;
  flex-grow: 1;
}

.bot-message-container {
  display: flex;
  flex-direction: row-reverse;
}

.user-message-container {
  display: flex;
  flex-direction: row-reverse;
}

.message-bot {
  flex: 1 1 0;
  margin: 0 50px 10px 50px;
  padding: 10px;
  border-radius: 5px;
  max-width: 90%;
  background: none;
  align-self: flex-start;
  text-align: justify;
}

.message-bot-icon {
  margin-right: 10px;
  opacity: 0.5;
}

.message-bot-btn {
  opacity: 0.3;

  button {
    padding: 5px;
  }
}

.message-bot-footer {
  margin: 5px 0 0 17px;
  font-size: 0.9rem;
}
.message-user {
  flex: 1 1 0;
  margin: 0 50px 10px 50px;
  padding: 10px;
  border-radius: 5px;
  max-width: 65%;
  background: var(--light);
  align-self: flex-start;
  text-align: justify;
}

.input-container {
  display: flex;
  padding: 10px 50px 10px 70px;
  border-top: 1px solid #eee;
  align-items: center;
}

.user-input {
  border: 1px solid #ddd;
  //padding: 10px;
  flex-grow: 1;
  border-radius: 18px;
  resize: none;
  overflow: hidden;
  max-height: 150px;
  display: flex;

  textarea {
    flex: 1;
    border: none;
  }
}

.send-button {
  border: none;
  background-color: var(--light);
  color: var(--black);
  padding: 10px 15px;
  //  margin-left: 10px;
  border-radius: 0% 0% 50% 0%;
  font-size: 1.2em;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.file-button {
  border: none;
  background: var(--light);
  font-weight: bold;
  color: var(--black);
  // transform: rotateX();
  //padding: 10px 15px;
  //  margin-left: 10px;
  border-radius: 40% 10% 5% 0%;
  font-size: 1.2em;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3rem;
}

@media (max-width: 768px) {
  .main-content {
    margin: 0 0 10px 0;
  }

  .message-bot {
    margin: 0 0 10px 0;
    max-width: 100%;
    padding: 5px;
  }
  .message-user {
    margin: 0 0 10px 0;
    max-width: 100%;
    padding: 5px;
  }
  .input-container {
    padding: 0;
  }
  .file-button {
    display: none;
  }
}
</style>
