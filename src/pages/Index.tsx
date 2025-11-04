import { MadeWithDyad } from "@/components/made-with-dyad";
import CandidateForm from "@/components/CandidateForm";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <CandidateForm />
      <MadeWithDyad />
    </div>
  );
};

export default Index;