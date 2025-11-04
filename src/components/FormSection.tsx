import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { CustomSlider } from "@/components/CustomSlider"; // Changed from Slider to CustomSlider
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface FormSectionProps {
  title: string;
  description?: string;
  fields: {
    name: string;
    label: string;
    type: "checkbox" | "slider";
    min?: number;
    max?: number;
    step?: number;
  }[];
  pathPrefix: string;
  className?: string;
  cardClassName?: string;
  headerClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

const FormSection: React.FC<FormSectionProps> = ({
  title,
  description,
  fields,
  pathPrefix,
  className,
  cardClassName,
  headerClassName,
  titleClassName,
  descriptionClassName,
}) => {
  const { control } = useFormContext();

  return (
    <Card className={cn("w-full shadow-lg border-inclusive-blue/50", cardClassName)}>
      <CardHeader className={cn("bg-inclusive-purple/10 text-center", headerClassName)}>
        <CardTitle className={cn("text-2xl font-bold text-inclusive-purple", titleClassName)}>
          {title}
        </CardTitle>
        {description && (
          <p className={cn("text-muted-foreground mt-2", descriptionClassName)}>
            {description}
          </p>
        )}
      </CardHeader>
      <CardContent className={cn("pt-6 space-y-4", className)}>
        {fields.map((field, index) => (
          <FormField
            key={field.name}
            control={control}
            name={`${pathPrefix}.${field.name}`}
            render={({ field: formField }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 bg-background">
                <div className="space-y-0.5">
                  <FormLabel className="text-base text-foreground">
                    {field.label}
                  </FormLabel>
                  <FormMessage />
                </div>
                {field.type === "checkbox" && (
                  <FormControl>
                    <Checkbox
                      checked={formField.value}
                      onCheckedChange={formField.onChange}
                      className="h-6 w-6 border-inclusive-orange data-[state=checked]:bg-inclusive-orange data-[state=checked]:text-inclusive-orange-foreground"
                    />
                  </FormControl>
                )}
                {field.type === "slider" && (
                  <div className="flex items-center space-x-4 w-1/2">
                    <Controller
                      name={`${pathPrefix}.${field.name}`}
                      control={control}
                      render={({ field: sliderField }) => (
                        <CustomSlider // Using CustomSlider
                          min={field.min || 1}
                          max={field.max || 5}
                          step={field.step || 1}
                          value={[sliderField.value || 1]}
                          onValueChange={(val) => sliderField.onChange(val[0])}
                          className="w-full" // Apply root classes here
                          rangeClassName="bg-inclusive-blue" // Apply color to the range
                          thumbClassName="border-inclusive-blue bg-inclusive-blue" // Apply color to the thumb
                        />
                      )}
                    />
                    <Label className="w-8 text-right text-lg font-semibold text-inclusive-blue">
                      {formField.value || 1}
                    </Label>
                  </div>
                )}
              </FormItem>
            )}
          />
        ))}
      </CardContent>
    </Card>
  );
};

export default FormSection;