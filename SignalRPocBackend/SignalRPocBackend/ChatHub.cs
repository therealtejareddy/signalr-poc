using System;
using Microsoft.AspNetCore.SignalR;

namespace SignalRPocBackend
{
	public class ChatHub : Hub
	{
        public override async Task OnConnectedAsync()
        {
            await Clients.All.SendAsync("ReceiveMessage", $"{Context.ConnectionId} is Joined");
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            await Clients.All.SendAsync("UserLeft", $"{Context.ConnectionId} is Left");
        }

        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("SendMessage", $"{user} sent {message}");
        }

    }
}

