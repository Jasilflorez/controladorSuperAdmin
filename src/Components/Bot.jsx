import React, { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import ChatBot from "react-simple-chatbot";

function Bot({ onColorChange }) {
  const [backgroundColor, setBackgroundColor] = useState("#f5f8fb");

  const steps = [
    {
    id: "1",
    message: "¡Hola! Soy un bot. puedo cambiar color de tu fondo",
    trigger: "2",
    },
    {
    id: "2",
    user: true,
    trigger: "3",
    },
    {
    id: "3",
    message:
    "Dime el color que necesita para tu fondo en ingles",
    trigger: "4",
    },
    {
    id: "4",
    user: true,
    validator: value => {
        setBackgroundColor(value.toLowerCase());
        return true;
    },
    trigger: "5",
    },
    {
    id: "5",
    message: "¡El color del fondo ha sido cambiado!",
    trigger: "2",
    },
];
const theme = {
    background: backgroundColor,
    fontFamily: "Arial, Helvetica, sans-serif",
    headerBgColor: "#4B8BF6",
    headerFontColor: "#fff",
    headerFontSize: "18px",
    botBubbleColor: "#4B8BF6",
    botFontColor: "#fff",
    userBubbleColor: "#fff",
    userFontColor: "#4a4a4a",
};

  // Llama a la función de cambio de color cuando se actualiza backgroundColor
useEffect(() => {
onColorChange(backgroundColor);
}, [backgroundColor, onColorChange]);

return (
    <ThemeProvider theme={theme}>
    <div className="bot-container">
        <ChatBot steps={steps} className="chatbot" />
    </div>
    </ThemeProvider>
);
}

export default Bot;
