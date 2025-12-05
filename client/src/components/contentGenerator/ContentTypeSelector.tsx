// eslint-disable-next-line @typescript-eslint/no-explicit-any
type CT = { id: string; name: string; icon: any };

type ContentTypeSelectorProps = {
  contentType: string;
  setContentType: (id: string) => void;
  contentTypes: CT[];
};

export default function ContentTypeSelector({
  contentType,
  setContentType,
  contentTypes,
}: ContentTypeSelectorProps) {

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-900 mb-3">
        Content Type
      </label>
      <div className="space-y-2">
        {contentTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => setContentType(type.id)}
            className={`w-full flex items-center gap-3 p-4 rounded-lg border-2 transition ${
              contentType === type.id
                ? "border-beiersdorf-blue bg-beiersdorf-light"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <type.icon className="w-5 h-5" />
            <span className="font-medium">{type.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
