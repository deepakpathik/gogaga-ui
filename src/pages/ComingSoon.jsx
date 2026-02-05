const ComingSoon = () => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            color: 'var(--text-secondary)',
            textAlign: 'center'
        }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--primary)' }}>Coming Soon</h1>
            <p>This feature is currently under development.</p>
        </div>
    );
};

export default ComingSoon;
