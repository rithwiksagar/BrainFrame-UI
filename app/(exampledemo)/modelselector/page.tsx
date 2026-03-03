import {
  ModelContent,
  ModelInput,
  ModelItems,
  ModelSelector,
  ModelTrigger,
} from "@/components/ai/modelSelector/ModelSelector";

export default function Component() {
  return (
    <div className="min-h-screen relative">
      <div className="flex h-screen items-center justify-center font-sans">
        <ModelSelector>
          <ModelTrigger />
          <ModelContent>
            <ModelInput />
            <ModelItems />
          </ModelContent>
        </ModelSelector>
      </div>
    </div>
  );
}
