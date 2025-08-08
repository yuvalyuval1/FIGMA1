import * as React from "react"
import { cn } from "./utils"

interface SliderProps {
  value: number[]
  onValueChange: (value: number[]) => void
  max: number
  min: number
  step: number
  className?: string
}

const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  ({ value, onValueChange, max, min, step, className, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onValueChange([parseInt(e.target.value)])
    }

    return (
      <div ref={ref} className={cn("relative w-full", className)} {...props}>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value[0]}
          onChange={handleChange}
          className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer slider"
          style={{
            background: `linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--primary)) ${((value[0] - min) / (max - min)) * 100}%, hsl(var(--secondary)) ${((value[0] - min) / (max - min)) * 100}%, hsl(var(--secondary)) 100%)`
          }}
        />
        <style jsx>{`
          .slider::-webkit-slider-thumb {
            appearance: none;
            height: 20px;
            width: 20px;
            border-radius: 50%;
            background: hsl(var(--primary));
            cursor: pointer;
            box-shadow: 0 0 10px rgba(139, 92, 246, 0.5);
          }
          .slider::-moz-range-thumb {
            height: 20px;
            width: 20px;
            border-radius: 50%;
            background: hsl(var(--primary));
            cursor: pointer;
            border: none;
            box-shadow: 0 0 10px rgba(139, 92, 246, 0.5);
          }
        `}</style>
      </div>
    )
  }
)
Slider.displayName = "Slider"

export { Slider }