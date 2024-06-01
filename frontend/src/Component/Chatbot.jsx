import React, { useEffect } from "react";

const Chatbot = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.botpress.cloud/webchat/v1/inject.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      window.botpressWebChat.init({
        botId: "a242dcdf-411c-4fc6-b679-655dd8def526",
        hostUrl: "https://cdn.botpress.cloud/webchat/v1",
        composerPlaceholder: "Chat with AgroSage",
        messagingUrl: "https://messaging.botpress.cloud",
        webhookId: "3a82d137-ab37-4bf5-b945-fe343bc946ae",
        clientId: "a242dcdf-411c-4fc6-b679-655dd8def526",
        botName: "AgroSage",
        avatarUrl:
          "https://th.bing.com/th/id/R.87cd6ae3d0f5a790e5c004b6416c3559?rik=vfKYnJObsl%2fqLQ&pid=ImgRaw&r=0",
        stylesheet:
          "https://webchat-styler-css.botpress.app/prod/5f574a4d-21a1-479d-ad41-a8322c4c21d1/v51597/style.css",
        frontendVersion: "v1",
        enableConversationDeletion: true,
        theme: "prism",
        themeColor: "#2563eb",
      });
    };

    // Cleanup function to reset chatbot on tab reload
    const handleTabReload = () => {
      console.log("tab is reloading");
      window.botpressWebChat.clearConversation();
    };

    window.addEventListener("unload", handleTabReload);

    return () => {
      window.removeEventListener("unload", handleTabReload);
    };
  }, []);

  return <div id="webchat" />;
};

export default Chatbot;
