const NotFoundBg = () => (
  <>
    <div
      className="absolute inset-0 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/404-image.png')",
      }}
    />

    <div className="absolute inset-0 bg-[#12382b]/35" />

    <main className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center not-found-content">
      <div className="text-sm font-light tracking-[0.4em] mb-4 opacity-80">
        ERROR
      </div>

      <h1 className="text-[12rem] md:text-[16rem] font-bold leading-none mb-6">
        404
      </h1>

      <div className="text-sm font-light tracking-[0.3em] opacity-80 mb-16">
        <div>PAGE NOT FOUND</div>
      </div>
    </main>

    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10">
      <a
        href="/"
        className="text-white text-sm font-light tracking-[0.3em] hover:opacity-70 transition-opacity border-b border-white/30 pb-1"
      >
        HOME
      </a>
    </div>
  </>
);

export default NotFoundBg;
