import { MadeWithDyad } from "@/components/made-with-dyad";
import MultiStepQuestionnaire from "@/components/MultiStepQuestionnaire";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <MultiStepQuestionnaire />
      <MadeWithDyad />
    </div>
  );
};

export default Index;