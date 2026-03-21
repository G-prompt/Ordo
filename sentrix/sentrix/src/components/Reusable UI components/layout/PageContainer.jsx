function PageContainer({ title, children }) {
    return (
        <main className="p-4 sm:p-6 lg:p-8 space-y-5 md:space-y-6 max-w-full md:max-w-6xl mx-auto">
            {title ? <h1 className="text-xl sm:text-2xl md:text-3xl font-bold leading-tight">{title}</h1> : null}
            {children}
        </main>
    );
}

export default PageContainer;
