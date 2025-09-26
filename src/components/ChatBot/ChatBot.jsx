import { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import styles from './ChatBot.module.css';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "¡Hola! Soy el asistente de TEXTIL. ¿En qué puedo ayudarte hoy?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const sendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      text: inputMessage,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse = getBotResponse(inputMessage);
      const botMessage = {
        id: messages.length + 2,
        text: botResponse,
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const getBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('precio') || message.includes('costo')) {
      return "Los precios varían según el tipo de servicio. Para encargos personalizados, te recomiendo contactarnos directamente para una cotización precisa.";
    }
    
    if (message.includes('tiempo') || message.includes('entrega')) {
      return "Los tiempos de entrega dependen del tipo de trabajo. Bordados simples: 3-5 días. Confecciones: 1-2 semanas. Te contactaremos con fechas específicas.";
    }
    
    if (message.includes('material') || message.includes('tela')) {
      return "Trabajamos con una amplia variedad de materiales: algodón, lino, seda, lana, y telas sintéticas. También podemos asesorarte sobre la mejor opción para tu proyecto.";
    }
    
    if (message.includes('encargo') || message.includes('personalizado')) {
      return "¡Perfecto! Ofrecemos servicios de encargos personalizados. Puedes visitar nuestra sección 'Encargos' o contactarnos directamente para discutir tu proyecto específico.";
    }
    
    if (message.includes('contacto') || message.includes('teléfono')) {
      return "Puedes contactarnos al +1 (555) 123-4567 o por email a info@textil.com. También puedes visitarnos en Av. Principal 123, Ciudad.";
    }
    
    return "Gracias por tu mensaje. Para información más específica sobre nuestros servicios, te recomiendo contactarnos directamente. ¿Hay algo más en lo que pueda ayudarte?";
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button 
        className={styles.chatButton}
        onClick={toggleChat}
        aria-label="Abrir chat"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className={styles.chatWindow}>
          <div className={styles.chatHeader}>
            <h3>Asistente TEXTIL</h3>
            <button 
              className={styles.closeButton}
              onClick={toggleChat}
              aria-label="Cerrar chat"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className={styles.messagesContainer}>
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`${styles.message} ${message.isBot ? styles.botMessage : styles.userMessage}`}
              >
                <div className={styles.messageContent}>
                  <p>{message.text}</p>
                  <span className={styles.timestamp}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          <div className={styles.inputContainer}>
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Escribe tu mensaje..."
              className={styles.messageInput}
            />
            <button 
              onClick={sendMessage}
              className={styles.sendButton}
              disabled={!inputMessage.trim()}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
