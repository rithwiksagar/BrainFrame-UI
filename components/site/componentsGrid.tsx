import ComponentCard from "./ComponentCard";

export default function ComponentsGrid() {
  return (
    <div className="w-full mt-60">
      <h2 className="text-2xl md:text-4xl text-center font-medium tracking-tighter">
        Components
      </h2>
      <h6 className="mt-2 md:mt-4 text-sm md:text-md text-center tracking-tighter text-neutral-500">
        10 carefully crafted components for building modern AI interfaces
        <span className="block">Distributed Via Shadcn</span>
      </h6>
      <div className="mt-8 mb-2 mx-1 grid grid-cols-1 md:grid-cols-3 gap-2">
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
