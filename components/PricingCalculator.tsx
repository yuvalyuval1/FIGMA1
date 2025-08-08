import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { 
  Calculator, 
  MessageCircle, 
  Zap, 
  Clock, 
  DollarSign,
  CheckCircle,
  TrendingUp,
  Users
} from 'lucide-react';
import { motion } from 'motion/react';

interface PriceRange {
  min: number;
  max: number;
  recommended: number;
}

const PricingCalculator: React.FC = () => {
  const [complexity, setComplexity] = useState(3);
  const [timeline, setTimeline] = useState(4);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [includeMaintenance, setIncludeMaintenance] = useState(false);
  const [priceRange, setPriceRange] = useState<PriceRange>({ min: 5000, max: 15000, recommended: 10000 });

  const complexityLevels = [
    { value: 1, label: 'בסיסי', description: 'אתר פשוט עם מספר עמודים' },
    { value: 2, label: 'סטנדרטי', description: 'אתר עסקי עם פונקציות בסיסיות' },
    { value: 3, label: 'מתקדם', description: 'אתר עם פונקציות מותאמות' },
    { value: 4, label: 'מורכב', description: 'מערכת מלאה עם אינטגרציות' },
    { value: 5, label: 'ארגוני', description: 'פלטפורמה מורכבת ומתקדמת' }
  ];

  const timelineOptions = [
    { value: 1, label: '1-2 שבועות', description: 'דחוף מאוד', multiplier: 1.5 },
    { value: 2, label: '2-3 שבועות', description: 'דחוף', multiplier: 1.3 },
    { value: 3, label: '3-4 שבועות', description: 'מהיר', multiplier: 1.1 },
    { value: 4, label: '4-6 שבועות', description: 'סטנדרטי', multiplier: 1.0 },
    { value: 5, label: '6-8 שבועות', description: 'גמיש', multiplier: 0.9 }
  ];

  const additionalFeatures = [
    { id: 'ecommerce', name: 'חנות אונליין', price: 8000, icon: '🛒' },
    { id: 'blog', name: 'מערכת בלוג', price: 2000, icon: '📝' },
    { id: 'booking', name: 'מערכת הזמנות', price: 4000, icon: '📅' },
    { id: 'crm', name: 'מערכת CRM', price: 6000, icon: '👥' },
    { id: 'analytics', name: 'אנליטיקה מתקדמת', price: 3000, icon: '📊' },
    { id: 'multilingual', name: 'רב לשוני', price: 3500, icon: '🌍' }
  ];

  // Calculate price based on selections
  useEffect(() => {
    const calculatePrice = () => {
      const basePrice = complexity * 3000;
      const timelineMultiplier = timelineOptions.find(t => t.value === timeline)?.multiplier || 1;
      const featuresPrice = selectedFeatures.reduce((total, featureId) => {
        const feature = additionalFeatures.find(f => f.id === featureId);
        return total + (feature?.price || 0);
      }, 0);
      const maintenanceAdjustment = includeMaintenance ? 0.9 : 1;
      const totalBase = (basePrice + featuresPrice) * timelineMultiplier * maintenanceAdjustment;
      
      setPriceRange({
        min: Math.round(totalBase * 0.8),
        max: Math.round(totalBase * 1.3),
        recommended: Math.round(totalBase)
      });
    };
    calculatePrice();
  }, [complexity, timeline, selectedFeatures, includeMaintenance]);

  const toggleFeature = (featureId: string) => {
    setSelectedFeatures(prev =>
      prev.includes(featureId)
        ? prev.filter(id => id !== featureId)
        : [...prev, featureId]
    );
  };

  const handleGetQuote = () => {
    const message = encodeURIComponent(
      `שלום, אשמח לקבל הצעת מחיר לפרויקט:
רמת מורכבות: ${complexityLevels.find(c => c.value === complexity)?.label}
לוחות זמנים: ${timelineOptions.find(t => t.value === timeline)?.label}
תוספות: ${selectedFeatures.length > 0 ? selectedFeatures.join(', ') : 'ללא תוספות'}
טווח מחירים: ₪${priceRange.min.toLocaleString()}-${priceRange.max.toLocaleString()}`
    );
    window.open(`https://wa.me/972533398557?text=${message}`, '_blank');
  };

  return (
    <div className="container mx-auto px-4">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 glass-card border border-primary/20 rounded-full mb-6">
          <Calculator className="w-4 h-4 text-primary" />
          <span className="text-sm text-primary-glow">מחשבון מחירים</span>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
          קבלו הערכת מחיר מיידית
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          השתמשו במחשבון החכם שלנו כדי לקבל הערכת מחיר ראשונית לפרויקט שלכם.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
        {/* Calculator Form */}
        <div className="space-y-8">
          {/* Complexity Selector */}
          <Card className="glass-card border-border/20">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <TrendingUp className="w-5 h-5 text-primary ml-2" />
                <h3 className="text-lg font-semibold">רמת מורכבות הפרויקט</h3>
              </div>
              
              <div className="mb-6">
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                  value={complexity}
                  onChange={(e) => setComplexity(parseInt(e.target.value))}
                  className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--primary)) ${((complexity - 1) / 4) * 100}%, hsl(var(--secondary)) ${((complexity - 1) / 4) * 100}%, hsl(var(--secondary)) 100%)`
                  }}
                />
              </div>

              <div className="space-y-2">
                {complexityLevels.map((level) => (
                  <div
                    key={level.value}
                    className={`p-3 rounded-lg border transition-all duration-300 ${
                      complexity === level.value
                        ? 'border-primary bg-primary/10'
                        : 'border-border/20 hover:border-primary/30'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-semibold">{level.label}</span>
                        <p className="text-sm text-muted-foreground">{level.description}</p>
                      </div>
                      {complexity === level.value && (
                        <CheckCircle className="w-5 h-5 text-primary" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Timeline Selector */}
          <Card className="glass-card border-border/20">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Clock className="w-5 h-5 text-primary ml-2" />
                <h3 className="text-lg font-semibold">לוחות זמנים נדרשים</h3>
              </div>
              
              <div className="mb-6">
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                  value={timeline}
                  onChange={(e) => setTimeline(parseInt(e.target.value))}
                  className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--primary)) ${((timeline - 1) / 4) * 100}%, hsl(var(--secondary)) ${((timeline - 1) / 4) * 100}%, hsl(var(--secondary)) 100%)`
                  }}
                />
              </div>

              <div className="space-y-2">
                {timelineOptions.map((option) => (
                  <div
                    key={option.value}
                    className={`p-3 rounded-lg border transition-all duration-300 ${
                      timeline === option.value
                        ? 'border-primary bg-primary/10'
                        : 'border-border/20 hover:border-primary/30'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-semibold">{option.label}</span>
                        <p className="text-sm text-muted-foreground">{option.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {option.multiplier !== 1 && (
                          <span className={`text-xs px-2 py-1 rounded ${option.multiplier > 1 ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
                            {option.multiplier > 1 ? '+' : '-'}{Math.round((Math.abs(option.multiplier - 1)) * 100)}%
                          </span>
                        )}
                        {timeline === option.value && (
                          <CheckCircle className="w-5 h-5 text-primary" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Additional Features */}
          <Card className="glass-card border-border/20">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Zap className="w-5 h-5 text-primary ml-2" />
                <h3 className="text-lg font-semibold">תוספות ופיצ'רים</h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {additionalFeatures.map((feature) => (
                  <button
                    key={feature.id}
                    onClick={() => toggleFeature(feature.id)}
                    className={`w-full p-3 rounded-lg border transition-all duration-300 text-right ${
                      selectedFeatures.includes(feature.id)
                        ? 'border-primary bg-primary/10'
                        : 'border-border/20 hover:border-primary/30'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{feature.icon}</span>
                        <div>
                          <div className="font-semibold text-sm">{feature.name}</div>
                          <div className="text-xs text-muted-foreground">
                            ₪{feature.price.toLocaleString()}
                          </div>
                        </div>
                      </div>
                      {selectedFeatures.includes(feature.id) && (
                        <CheckCircle className="w-4 h-4 text-primary" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Maintenance Option */}
          <Card className="glass-card border-border/20">
            <CardContent className="p-6">
              <button
                onClick={() => setIncludeMaintenance(!includeMaintenance)}
                className={`w-full p-4 rounded-lg border transition-all duration-300 ${
                  includeMaintenance
                    ? 'border-primary bg-primary/10'
                    : 'border-border/20 hover:border-primary/30'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-primary" />
                    <div className="text-right">
                      <div className="font-semibold">תחזוקה שוטפת</div>
                      <div className="text-sm text-muted-foreground">
                        הנחה של 10% על הפרויקט + תמיכה שוטפת
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-1 rounded bg-green-500/20 text-green-400">-10%</span>
                    {includeMaintenance && (
                      <CheckCircle className="w-5 h-5 text-primary" />
                    )}
                  </div>
                </div>
              </button>
            </CardContent>
          </Card>
        </div>

        {/* Price Summary */}
        <div className="space-y-6">
          <Card className="glass-card border-primary/20 bg-gradient-to-br from-primary/5 to-primary-glow/5 sticky top-24">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <DollarSign className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">הערכת מחיר</h3>
                <p className="text-muted-foreground">על בסיס הבחירות שלכם</p>
              </div>

              <div className="space-y-6">
                {/* Price Range */}
                <div className="text-center">
                  <div className="text-sm text-muted-foreground mb-2">טווח מחירים</div>
                  <div className="text-3xl font-bold gradient-text">
                    ₪{priceRange.min.toLocaleString()} - ₪{priceRange.max.toLocaleString()}
                  </div>
                </div>

                {/* Recommended Price */}
                <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground mb-1">מחיר מומלץ</div>
                    <div className="text-2xl font-bold text-primary">
                      ₪{priceRange.recommended.toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <Button
                  onClick={handleGetQuote}
                  size="lg"
                  className="w-full bg-gradient-to-r from-primary to-primary-glow hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
                >
                  <MessageCircle className="w-5 h-5 ml-2" />
                  קבלו הצעת מחיר מדויקת
                </Button>

                <div className="text-center text-xs text-muted-foreground">
                  * המחירים הם הערכה ראשונית. המחיר הסופי יקבע לאחר פגישת ייעוץ מפורטת
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PricingCalculator;