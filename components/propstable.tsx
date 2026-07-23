type Prop = {
  prop: string;
  type: string;
  default?: string;
  description: string;
};

interface PropsTableProps {
  title: string;
  data: Prop[];
}

export default function PropsTable({
  title,
  data,
}: PropsTableProps) {
  if (data.length === 0) return null;

  return (
    <div className="mt-10">
      <h6 className="text-[14xp] font-semibold mb-1 text-neutral-500">{title}</h6>

      <div className="w-158 rounded-xl border border-neutral-300 dark:border-neutral-700">
        <table className="w-full border-collapse text-left">
          <thead className="border-b bg-muted/40">
            <tr>
              <th className="px-4 py-3 text-sm font-semibold">Prop</th>
              <th className="px-4 py-3 text-sm font-semibold">Type</th>
              <th className="px-4 py-3 text-sm font-semibold">Default</th>
              <th className="px-4 py-3 text-sm font-semibold">Description</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item) => (
              <tr key={item.prop} className="border-b last:border-none">
                <td className="px-4 py-3">
                  <code className="rounded bg-muted px-2 py-1 text-sm text-neutral-500 dark:text-neutral-300 font-mono">
                    {item.prop}
                  </code>
                </td>

                <td className="px-4 py-3">
                  <code className="text-sm text-neutral-500 dark:text-neutral-300 font-mono">
                    {item.type}
                  </code>
                </td>

                <td className="px-4 py-3">
                  {item.default ? (
                    <code className="text-sm text-neutral-500 dark:text-neutral-300">
                      {item.default}
                    </code>
                  ) : (
                    <span className="px-4 text-muted-foreground text-neutral-700 dark:text-neutral-300">—</span>
                  )}
                </td>

                <td className="px-4 py-3 text-neutral-700 dark:text-neutral-300">
                  {item.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}