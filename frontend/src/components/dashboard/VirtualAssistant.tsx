import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Send, Bot, User, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

const sampleQueries = [
  "Which species are declining near Kochi?",
  "Show me temperature trends in Arabian Sea",
  "What's the correlation between pH and coral health?",
  "Predict sardine population for next quarter",
  "Generate species diversity report for Bay of Bengal"
];

const mockResponses: { [key: string]: string } = {
  "declining near kochi": "Based on recent data analysis, three species show significant decline near Kochi: \n\n🐟 **Sardina pilchardus** (Indian Oil Sardine) - 23% decline over last 6 months\n🐟 **Rastrelliger kanagurta** (Indian Mackerel) - 18% decline \n🐟 **Stolephorus commersonnii** (Commerson's Anchovy) - 15% decline\n\n**Primary factors:** Rising sea temperatures (+2.1°C), reduced plankton density, and overfishing pressure. \n\n📊 I can generate a detailed report with population trends and conservation recommendations.",
  
  "temperature trends arabian": "**Arabian Sea Temperature Analysis (2023-2024):**\n\n📈 **Key Trends:**\n• Average SST increased by 1.8°C compared to historical baseline\n• Peak temperatures: 31.2°C (May 2024)\n• Seasonal variation: 4.7°C range\n• Warming rate: 0.3°C per year\n\n🌊 **Spatial Distribution:**\n• Northern regions warming faster (+2.3°C)\n• Coastal areas show highest variability\n• Deep water temperatures stable\n\n⚠️ **Impact on Marine Life:**\n• 15% decline in cold-water species\n• Coral bleaching events increased 40%\n• Plankton productivity down 22%",
  
  "ph coral health": "**Ocean pH vs Coral Health Correlation Analysis:**\n\n📊 **Statistical Results:**\n• Correlation coefficient: r = 0.78 (strong positive)\n• P-value < 0.001 (highly significant)\n• R² = 0.61 (61% variance explained)\n\n🪸 **Key Findings:**\n• Optimal coral health at pH 8.1-8.3\n• 50% coral coverage loss when pH < 7.8\n• Recovery rate: 3-5 years for pH restoration\n\n📍 **Regional Variations:**\n• Maldives: pH 8.0, coral health 65%\n• Lakshadweep: pH 7.9, coral health 45%\n• Andaman: pH 8.1, coral health 78%\n\n💡 **Recommendation:** Implement pH monitoring stations and reduce carbonic acid sources.",
  
  "sardine population predict": "**Sardine Population Forecast (Next Quarter):**\n\n🎯 **Prediction Model Results:**\n• **Confidence Level:** 87%\n• **Expected Change:** -12% to -18% decline\n• **Population Estimate:** 850,000 - 920,000 individuals\n\n📉 **Contributing Factors:**\n• Sea temperature rise (+1.9°C predicted)\n• El Niño effects strengthening\n• Reduced upwelling events\n• Plankton availability declining\n\n🗓️ **Timeline:**\n• Jan-Feb: Moderate decline (-8%)\n• Mar: Steeper decline (-25%)\n• Recovery possible in Apr-May if temperatures stabilize\n\n⚡ **Recommended Actions:**\n• Temporary fishing restrictions in critical spawning areas\n• Enhanced monitoring in nursery grounds\n• Stakeholder notification for supply chain planning",
  
  "diversity report bengal": "**Bay of Bengal Species Diversity Report**\n\n🌊 **Overview:**\n• **Total Species Recorded:** 2,347\n• **Endemic Species:** 289 (12.3%)\n• **Threatened Species:** 156 (6.6%)\n• **New Species (2024):** 23\n\n📊 **Diversity Indices:**\n• Shannon Diversity Index: 3.42\n• Simpson's Index: 0.89\n• Species Richness: High (compared to global averages)\n\n🐟 **Major Groups:**\n• Fish: 1,456 species (62%)\n• Crustaceans: 387 species (16.5%)\n• Mollusks: 298 species (12.7%)\n• Marine mammals: 34 species (1.4%)\n• Others: 172 species (7.4%)\n\n⚠️ **Conservation Status:**\n• 23% species showing population decline\n• Habitat degradation affecting 67% of coastal species\n• Climate change impact score: 7.2/10\n\n📈 **Recommendations:**\n• Establish 3 new Marine Protected Areas\n• Enhanced monitoring for 45 key indicator species\n• Community-based conservation programs"
};

export function VirtualAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your Virtual Ocean Assistant. I can help you analyze marine data, generate reports, and answer questions about species, environmental factors, and trends. What would you like to know?",
      sender: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responseKey = Object.keys(mockResponses).find(key => 
        inputMessage.toLowerCase().includes(key)
      );
      
      const response = responseKey ? mockResponses[responseKey] : 
        "I understand your question about marine data. Let me analyze the available datasets and provide you with relevant insights. Based on current data patterns and environmental factors, I can help you explore correlations, trends, and predictions. Could you provide more specific parameters or location details for a more targeted analysis?";

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: 'assistant',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const handleSampleQuery = (query: string) => {
    setInputMessage(query);
  };

  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-white flex items-center">
            <Bot className="h-5 w-5 mr-2 text-blue-400" />
            Virtual Ocean Assistant
          </h3>
          <p className="text-slate-400">
            AI-powered assistant for marine data analysis and insights
          </p>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <h4 className="font-semibold text-white">Sample Queries</h4>
            <p className="text-sm text-slate-400">Click to try these examples</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {sampleQueries.map((query, index) => (
                <button
                  key={index}
                  onClick={() => handleSampleQuery(query)}
                  className="w-full text-left p-3 bg-slate-800/30 hover:bg-slate-800/50 border border-slate-700 rounded-lg text-sm text-slate-300 transition-colors"
                >
                  <Sparkles className="h-3 w-3 inline mr-2 text-yellow-400" />
                  {query}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardContent className="p-0">
            <div className="h-96 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start space-x-3 ${
                    message.sender === 'user' ? 'justify-end' : ''
                  }`}
                >
                  {message.sender === 'assistant' && (
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                    </div>
                  )}
                  
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-blue-600 text-white ml-auto'
                        : 'bg-slate-800 text-slate-200'
                    }`}
                  >
                    <p className="whitespace-pre-line">{message.content}</p>
                    <p className={`text-xs mt-1 ${
                      message.sender === 'user' ? 'text-blue-200' : 'text-slate-400'
                    }`}>
                      {formatTimestamp(message.timestamp)}
                    </p>
                  </div>

                  {message.sender === 'user' && (
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-white" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
              
              {isTyping && (
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  <div className="bg-slate-800 px-4 py-2 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="border-t border-slate-700 p-4">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask about marine species, correlations, predictions..."
                  className="flex-1 px-3 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isTyping}
                />
                <Button
                  variant="primary"
                  onClick={handleSendMessage}
                  disabled={isTyping || !inputMessage.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}