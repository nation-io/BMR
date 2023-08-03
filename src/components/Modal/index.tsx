import clsxm from "@/lib/clsxm";

export type ModalProps = {
  height?: string;
  width?: string;
  title: string;
  description?: string;
  action: string;
  showing: boolean;
  onClose: () => void;
  onSubmit: () => void;
  actionable: boolean;
  children?: any;
};

export const Modal = ({
  height,
  width,
  title,
  description,
  action,
  showing,
  onClose,
  onSubmit,
  actionable,
  children,
}: ModalProps) => {
  return (
    <>
      {showing
        ? (
          <>
            <div className="flex justify-center items-center overflow-hidden fixed inset-0 z-50 outline-none focus:outline-none">
              <div
                className={clsxm([
                  "my-6 mx-auto max-w-3xl align-center",
                  width || "w-full",
                ])}
              >
                <div
                  className={clsxm([
                    height || "h-auto",
                    "border-0 rounded-lg shadow-lg relative flex flex-col bg-white focus:outline",
                  ])}
                >
                  <div className="flex items-start justify-between p-5 rounded-t ">
                    <h3 className="text-3xl font=semibold">{title}</h3>
                    <button
                      className="bg-transparent border-0 text-black float-right"
                      onClick={() => onClose()}
                    >
                      X
                    </button>
                  </div>
                  {description && (
                    <div className="relative pl-6 pr-6 flex-auto justify-center">
                      <div className="text-2xl font-semilight">
                        {description}
                      </div>
                    </div>
                  )}
                  <div className="relative pl-6 pr-6 flex-auto align-middle">
                    {children}
                  </div>
                  <div className="">
                    <div
                      onClick={() => {
                        onSubmit();
                        onClose();
                      }}
                      className={clsxm([
                        "flex items-center justify-center rounded-b-lg py-3",
                        actionable
                          ? "cursor-pointer hover:bg-[#1a1f2e] bg-black"
                          : "bg-black",
                      ])}
                    >
                      <p
                        className={clsxm([
                          "font-medium 2xl:text-3xl",
                          actionable ? "text-white" : "text-[#718096]",
                        ])}
                      >
                        {action}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )
        : (
          <>
          </>
        )}
    </>
  );
};
