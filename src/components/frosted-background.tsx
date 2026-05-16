export const FrostedBackground = () => {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Left Side Gradient - Soft Mint/Tertiary */}
      <div
        className="absolute top-[-10%] left-[-15%] w-[600px] h-[600px] bg-tertiary/40 rounded-full blur-[120px] mix-blend-multiply animate-float-slow opacity-90"
        style={{ animationDelay: "0s" }}
      />

      {/* Right Side Gradient - Primary/Green */}
      <div
        className="absolute top-[-5%] right-[-15%] w-[600px] h-[600px] bg-primary/30 rounded-full blur-[130px] mix-blend-multiply animate-float-slow opacity-90"
        style={{ animationDelay: "1s" }}
      />

      {/* Supplemental Right - Secondary/Cream */}
      <div
        className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] bg-secondary/40 rounded-full blur-[100px] mix-blend-multiply animate-float-slow opacity-50"
        style={{ animationDelay: "3s" }}
      />

      {/* Light texture overlay */}
      <div className="absolute inset-0 bg-background/10 backdrop-blur-[20px]" />
    </div>
  );
};