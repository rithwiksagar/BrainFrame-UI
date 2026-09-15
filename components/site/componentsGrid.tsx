import ComponentCard from "./ComponentCard";

export default function ComponentsGrid() {
  return (
    <div className="w-full mt-60">
      <h2 className="text-4xl text-center font-medium tracking-tighter">
        Components
      </h2>
      <h6 className="mt-4 text-md text-center tracking-tighter text-neutral-500">
        10 carefully crafted components for building modern AI interfaces
        <span className="block">Distributed Via Shadcn</span>
      </h6>
      <div className="mt-8 mb-2 grid grid-cols-3 gap-2">
        <ComponentCard />
        <ComponentCard />
        <ComponentCard />
        <ComponentCard />
        <ComponentCard />
        <ComponentCard />
        <ComponentCard />
        <ComponentCard />
        <ComponentCard />
      </div>
    </div>
  );
}
