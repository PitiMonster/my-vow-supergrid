import classNames from "classnames";

type Props = React.PropsWithChildren<{
  header: string;
  subheader?: string;
  size?: "md" | "lg";
}>;

export const ModalLikeContainer: React.FC<Props> = ({
  header,
  subheader,
  size = "md",
  children,
}) => (
  <div
    className={classNames(
      "p-10 bg-white z-10 flex flex-col gap-y-10 max_h_910:gap-y-5 text-blue-900 rounded-[4px] shadow-modal",
      { "w-[582px]": size === "md", "w-[700px]": size === "lg" }
    )}
  >
    <div>
      <img
        src="/icons/vowmade-logo.svg"
        alt="VOW Logo"
        className="h-10 max_h_910:h-8"
      />
    </div>
    <div className="flex flex-col gap-y-2.5">
      <h1 className="font-black text-[32px] leading-[50px] max_h_910:text-24 max_h_910:leading-[36px]">
        {header}
      </h1>
      {!!subheader && <h2 className="font-semibold text-14">{subheader}</h2>}
    </div>
    <div className="relative max-h-[calc(100vh-80px)] grid bg-white-0 rounded-4px">
      {children}
    </div>
  </div>
);
