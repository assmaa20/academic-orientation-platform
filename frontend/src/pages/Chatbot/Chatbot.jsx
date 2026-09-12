import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { useFullscreen } from "../../context/FullscreenContext";

import ChatSidebar from "../../components/Chatbot/ChatSidebar";
import ChatHeader from "../../components/Chatbot/ChatHeader";
import ChatMessages from "../../components/Chatbot/ChatMessages";
import ChatInput from "../../components/Chatbot/ChatInput";

import {
    getConversations,
    createConversation,
    getMessages,
    sendMessage,
    renameConversation
} from "../../services/chatService";

import {
    getFiliere
} from "../../services/filiereService";

export default function Chatbot() {

    const [searchParams] = useSearchParams();

    const filiereId = searchParams.get("filiere");

    const user = JSON.parse(localStorage.getItem("user"));

    const {
        fullscreen,
        setFullscreen
    } = useFullscreen();

    const [conversations, setConversations] = useState([]);

    const [messages, setMessages] = useState([]);

    const [currentConversation, setCurrentConversation] = useState(null);

    const [typing, setTyping] = useState(false);

    const [currentFiliere, setCurrentFiliere] = useState(null);

    const [contextMessage, setContextMessage] = useState(null);

    // =====================================
    // Réinitialiser le plein écran
    // =====================================

    useEffect(() => {

        setFullscreen(false);

        return () => {

            setFullscreen(false);

        };

    }, []);

    // =====================================
    // Initialisation du chat
    // =====================================

    useEffect(() => {

        initChat();

    }, [filiereId]);

    const initChat = async () => {

        try {

            if (filiereId) {

                await loadCurrentFiliere();

                const conversation = await createConversation(
                    "Nouvelle conversation"
                );

                setCurrentConversation(conversation.id);

                setMessages([]);

                const data = await getConversations();

                setConversations(data);

            }

            else {

                setCurrentFiliere(null);

                setContextMessage(null);

                const data = await getConversations();

                setConversations(data);

                if (data.length > 0) {

                    setCurrentConversation(data[0].id);

                }

            }

        }

        catch (error) {

            console.log(error);

        }

    };

// =====================================
// Charger la filière courante
// =====================================

const loadCurrentFiliere = async () => {

    try {

        const data = await getFiliere(filiereId);

        setCurrentFiliere(data);

        setContextMessage({

            role: "assistant",

            content: `👋 Bonjour !

Vous consultez actuellement cette filière :

🎓 ${data.libelle_diplome}

📚 ${data.discipline}

🏛 Université ${data.code_universite}

🌍 ${data.langue}

⏱ ${data.duree_accreditation} ans

Je répondrai automatiquement à toutes vos questions concernant cette filière.

Vous pouvez par exemple demander :

• Quels sont les débouchés ?
• Les matières étudiées
• Les métiers accessibles
• La poursuite d'études
• Les conditions d'admission`

        });

    }

    catch (error) {

        console.log(error);

    }

};

// =====================================
// Charger les messages
// =====================================

useEffect(() => {

    if (currentConversation) {

        loadMessages(currentConversation);

    }

}, [currentConversation]);

const loadMessages = async (conversationId) => {

    try {

        const data = await getMessages(conversationId);

        setMessages(data);

    }

    catch (error) {

        console.log(error);

    }

};

// =====================================
// Envoyer un message
// =====================================

const handleSendMessage = async (text) => {

    if (!text.trim()) return;

    if (!currentConversation) return;

    try {

        setTyping(true);

        await sendMessage(

            currentConversation,

            text,

            currentFiliere?.id

        );

        const conversation = conversations.find(

            c => c.id === currentConversation

        );

        if (

            conversation &&

            conversation.title === "Nouvelle conversation"

        ) {

            let title = text.trim();

            if (title.length > 45) {

                title = title.substring(0, 45) + "...";

            }

            await renameConversation(

                currentConversation,

                title

            );

            const data = await getConversations();

            setConversations(data);

        }

        await loadMessages(currentConversation);

    }

    catch (error) {

        console.log(error);

    }

    finally {

        setTyping(false);

    }

};

// =====================================
// Nouvelle conversation
// =====================================

const newConversation = async () => {

    try {

        const conversation = await createConversation(
            "Nouvelle conversation"
        );

        const data = await getConversations();

        setConversations(data);

        setCurrentConversation(conversation.id);

        setMessages([]);

        setCurrentFiliere(null);

        setContextMessage(null);

        setFullscreen(false);

    }

    catch (error) {

        console.log(error);

    }

};

// =====================================
// Interface
// =====================================

return (

    <div className="flex h-full overflow-hidden">

        <ChatSidebar

            conversations={conversations}

            currentConversation={currentConversation}

            setCurrentConversation={setCurrentConversation}

            newConversation={newConversation}

        />

        <div className="flex flex-col flex-1 overflow-hidden">

            <ChatHeader

                fullscreen={fullscreen}

                setFullscreen={setFullscreen}

            />

            <ChatMessages

                messages={
                    contextMessage
                        ? [contextMessage, ...messages]
                        : messages
                }

                typing={typing}

            />

            <ChatInput

                onSend={handleSendMessage}

            />

        </div>

    </div>

);

}