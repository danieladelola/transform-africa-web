import { useEffect, useState } from "react";
import { Trash2, Eye, EyeOff, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

const Messages = () => {
  const [messages, setMessages] = useState<ContactSubmission[]>([]);
  const [filteredMessages, setFilteredMessages] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMessage, setSelectedMessage] = useState<ContactSubmission | null>(null);

  useEffect(() => {
    fetchMessages();
    // Set up real-time subscription
    const subscription = supabase
      .channel("contact_submissions_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "contact_submissions",
        },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setMessages((prev) => [payload.new as ContactSubmission, ...prev]);
          } else if (payload.eventType === "UPDATE") {
            setMessages((prev) =>
              prev.map((m) =>
                m.id === payload.new.id ? (payload.new as ContactSubmission) : m
              )
            );
          } else if (payload.eventType === "DELETE") {
            setMessages((prev) => prev.filter((m) => m.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const filtered = messages.filter(
      (msg) =>
        msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.message.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMessages(filtered);
  }, [searchTerm, messages]);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("contact_submissions")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      toast.error("Failed to load messages");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const toggleReadStatus = async (id: string, isRead: boolean) => {
    try {
      const { error } = await supabase
        .from("contact_submissions")
        .update({ is_read: !isRead })
        .eq("id", id);

      if (error) throw error;
      toast.success(isRead ? "Marked as unread" : "Marked as read");
    } catch (error) {
      toast.error("Failed to update message status");
      console.error(error);
    }
  };

  const deleteMessage = async (id: string) => {
    try {
      const { error } = await supabase
        .from("contact_submissions")
        .delete()
        .eq("id", id);

      if (error) throw error;
      toast.success("Message deleted");
    } catch (error) {
      toast.error("Failed to delete message");
      console.error(error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold" />
      </div>
    );
  }

  const unreadCount = messages.filter((m) => !m.is_read).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Messages</h1>
          <p className="text-muted-foreground mt-1">
            {messages.length} total • {unreadCount} unread
          </p>
        </div>
        <div className="w-full sm:w-64">
          <Input
            placeholder="Search messages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
      </div>

      {filteredMessages.length === 0 ? (
        <Card>
          <CardContent className="py-12">
            <div className="text-center">
              <Mail className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground">
                {searchTerm ? "No messages match your search." : "No messages yet."}
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {filteredMessages.map((message) => (
            <Card
              key={message.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                !message.is_read ? "bg-blue-50/50 dark:bg-blue-950/20 border-blue-200/50 dark:border-blue-900/50" : ""
              }`}
              onClick={() => setSelectedMessage(message)}
            >
              <CardContent className="p-6">
                <div className="grid md:grid-cols-3 gap-4 items-start">
                  {/* Message Info */}
                  <div className="md:col-span-2 space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-semibold text-foreground">{message.name}</h3>
                          {!message.is_read && (
                            <span className="w-2 h-2 rounded-full bg-blue-500" title="Unread" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{message.email}</p>
                        {message.phone && (
                          <p className="text-sm text-muted-foreground">{message.phone}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-foreground mb-1">Subject</p>
                      <p className="text-foreground font-medium">{message.subject}</p>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">Message</p>
                      <p className="text-foreground leading-relaxed line-clamp-3 whitespace-pre-wrap">
                        {message.message}
                      </p>
                    </div>

                    <p className="text-xs text-muted-foreground">{formatDate(message.created_at)}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 md:justify-end md:flex-col">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleReadStatus(message.id, message.is_read);
                      }}
                      title={message.is_read ? "Mark as unread" : "Mark as read"}
                    >
                      {message.is_read ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogTitle>Delete Message</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete this message? This action cannot be undone.
                        </AlertDialogDescription>
                        <div className="flex gap-3 justify-end">
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => deleteMessage(message.id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Delete
                          </AlertDialogAction>
                        </div>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Message Details Modal */}
      {selectedMessage && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedMessage(null)}
        >
          <Card
            className="w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <CardHeader className="sticky top-0 bg-card border-b">
              <CardTitle className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">From</p>
                  <p className="text-foreground">{selectedMessage.name}</p>
                </div>
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  ✕
                </button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 py-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Email</p>
                  <p className="text-foreground break-all">{selectedMessage.email}</p>
                </div>
                {selectedMessage.phone && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Phone</p>
                    <p className="text-foreground">{selectedMessage.phone}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Subject</p>
                  <p className="text-foreground">{selectedMessage.subject}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Received</p>
                  <p className="text-foreground">{formatDate(selectedMessage.created_at)}</p>
                </div>
              </div>

              <div className="border-t pt-6">
                <p className="text-sm font-medium text-muted-foreground mb-3">Message</p>
                <p className="text-foreground text-base leading-relaxed whitespace-pre-wrap bg-muted/50 rounded-lg p-4">
                  {selectedMessage.message}
                </p>
              </div>

              <div className="flex gap-3 justify-end border-t pt-6">
                <Button
                  variant="outline"
                  onClick={() => {
                    toggleReadStatus(selectedMessage.id, selectedMessage.is_read);
                    setSelectedMessage(null);
                  }}
                >
                  {selectedMessage.is_read ? "Mark as Unread" : "Mark as Read"}
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">Delete Message</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogTitle>Delete Message</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete this message? This action cannot be undone.
                    </AlertDialogDescription>
                    <div className="flex gap-3 justify-end">
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => {
                          deleteMessage(selectedMessage.id);
                          setSelectedMessage(null);
                        }}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Delete
                      </AlertDialogAction>
                    </div>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Messages;
