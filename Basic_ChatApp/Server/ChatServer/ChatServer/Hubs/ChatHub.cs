using ChatServer.Interface;
using Microsoft.AspNetCore.SignalR;

namespace ChatServer.Hubs
{
    public class ChatHub : Hub
    {
        public async Task NewMessage(string username, string message) =>
            await Clients.All.SendAsync("messageReceived", username, message);

        /*        public void Hello()
                {
                    Clients.Caller.DisplayMessage("Hello from the SignalrDemoHub!");
                }*/
    }
}
