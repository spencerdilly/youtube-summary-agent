import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useTooltipProvider } from "@/components/ui/tooltip";

const fetchGreeting = async (): Promise<string> => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return "Welcome to the recreated app!";
};

const Index = () => {
  const [enabled, setEnabled] = useState(true);
  const tooltipEnabled = useTooltipProvider();
  const { data, isLoading } = useQuery({
    queryKey: ["greeting", enabled],
    queryFn: fetchGreeting,
    enabled,
  });

  return (
    <main>
      <h1>YouTube Summary Agent UI</h1>
      <p>{tooltipEnabled ? "Tooltips are globally enabled." : "Tooltips disabled."}</p>
      <p>{isLoading ? "Loading..." : data}</p>
      <button onClick={() => setEnabled((value) => !value)}>
        {enabled ? "Disable" : "Enable"} greeting query
      </button>
      <p>
        <Link to="/missing">Visit an unknown page</Link> to see the not found route.
      </p>
    </main>
  );
};

export default Index;
