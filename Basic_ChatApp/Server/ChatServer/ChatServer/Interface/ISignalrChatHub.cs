namespace ChatServer.Interface
{
    public interface ISignalrChatHub
    {
        Task DisplayMessage( string message );        
    }
}
