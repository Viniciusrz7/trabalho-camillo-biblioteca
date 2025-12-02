/**
 * Cabeçalho com título e botão opcional
 * Exemplo: <PageHeader title="Multas" buttonText="+ Novo" onButtonClick={...} />
 */

interface PageHeaderProps {
  title: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

export default function PageHeader({ title, buttonText, onButtonClick }: PageHeaderProps) {
  const temBotao = buttonText && onButtonClick;
  const estiloBotao = "bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg";

  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-4xl font-bold">{title}</h1>
      
      {temBotao && (
        <button onClick={onButtonClick} className={estiloBotao}>
          {buttonText}
        </button>
      )}
    </div>
  );
}
