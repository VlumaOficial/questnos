import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CustomSlider } from "@/components/CustomSlider";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface FormFieldDefinition {
  name: string;
  label: string;
  // Removendo 'type: "checkbox" | "slider"' pois agora é sempre slider
  min?: number;
  max?: number;
  step?: number;
}

interface FormSectionProps {
  title: string;
  description?: string;
  fields: FormFieldDefinition[];
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
        {fields && fields.length > 0 ? fields.map((field) => (
          <FormField
            key={field.name}
            control={control}
            name={`${pathPrefix}.${field.name}`}
            render={({ field: formField }) => (
              <FormItem className="flex flex-col sm:flex-row sm:items-center justify-between rounded-lg border p-4 bg-background">
                <div className="space-y-0.5 sm:w-1/2">
                  <FormLabel className="text-base text-foreground">
                    {field.label}
                  </FormLabel>
                  <FormMessage />
                </div>
                
                <div className="flex items-center space-x-4 mt-4 sm:mt-0 sm:w-1/2">
                  <Controller
                    name={`${pathPrefix}.${field.name}`}
                    control={control}
                    render={({ field: sliderField }) => (
                      <CustomSlider
                        min={field.min || 1}
                        max={field.max || 5}
                        step={field.step || 1}
                        // Garante que o valor inicial seja 1 se for undefined/null
                        value={[sliderField.value || 1]} 
                        onValueChange={(val) => sliderField.onChange(val[0])}
                        className="w-full"
                        rangeClassName="bg-inclusive-blue"
                        thumbClassName="border-inclusive-blue bg-inclusive-blue"
                      />
                    )}
                  />
                  <Label className="w-8 text-right text-lg font-semibold text-inclusive-blue">
                    {formField.value || 1}
                  </Label>
                </div>
              </FormItem>
            )}
          />
        )) : (
          <div className="text-center py-8 text-muted-foreground">
            Nenhum campo disponível
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FormSection;