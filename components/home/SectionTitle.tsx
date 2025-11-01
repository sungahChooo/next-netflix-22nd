type Props = {
  title: string;
};

export default function SectionTitle({ title }: Props) {
  return (
    <div className="text-xl font-semibold w-[350px] text-white">{title}</div>
  );
}
