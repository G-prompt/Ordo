function Card({ children, className = "" }) {
    return (
        <div className={`bg-card border border-border rounded-2xl p-4 shadow-sm hover:shadow-lg transition-shadow duration-200 card-shadow ${className}`}>
            {children}
        </div>
    );
}

export default Card;