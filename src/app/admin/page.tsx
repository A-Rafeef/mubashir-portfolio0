'use client';

import React, { useState, useEffect } from 'react';
import { db, ContactMessage } from '@/lib/db';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Dialog } from '@/components/ui/Dialog';
import {
  Briefcase,
  Layers,
  MessageSquare,
  Users,
  Award,
  CheckCircle,
  Eye,
  Trash2,
  Calendar,
  Compass,
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminDashboardPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [counts, setCounts] = useState({
    experiences: 0,
    campaigns: 0,
    services: 0,
    unreadMessages: 0,
  });
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const [exps, cmps, srvs, msgs] = await Promise.all([
        db.getExperiences(),
        db.getCampaigns(),
        db.getServices(),
        db.getMessages(),
      ]);

      setMessages(msgs);
      setCounts({
        experiences: exps.length,
        campaigns: cmps.length,
        services: srvs.length,
        unreadMessages: msgs.filter((m) => m.status === 'unread').length,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleMarkAsRead = async (id: string) => {
    await db.updateMessageStatus(id, 'read');
    await loadData();
    if (selectedMessage && selectedMessage.id === id) {
      setSelectedMessage({ ...selectedMessage, status: 'read' });
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (confirm('Are you sure you want to delete this message?')) {
      await db.deleteMessage(id);
      setSelectedMessage(null);
      await loadData();
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  // Dashboard Stats Items
  const statsList = [
    { name: 'Experiences', value: counts.experiences, icon: Briefcase, color: 'text-primary bg-primary/5 border-primary/10' },
    { name: 'Campaigns', value: counts.campaigns, icon: Layers, color: 'text-tertiary bg-tertiary/5 border-tertiary/10' },
    { name: 'Services', value: counts.services, icon: Compass, color: 'text-primary bg-primary/5 border-primary/10' },
    { name: 'Unread Messages', value: counts.unreadMessages, icon: MessageSquare, color: counts.unreadMessages > 0 ? 'text-secondary bg-secondary/5 border-secondary/10' : 'text-secondary-text bg-neutral-bg border-neutral-border' },
    { name: 'Monthly Visitors', value: '1,842', icon: Users, color: 'text-primary bg-primary/5 border-primary/10' },
  ];

  return (
    <div className="flex flex-col gap-8 text-left">
      
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-extrabold font-epilogue tracking-tight uppercase text-primary-text">
          Control Dashboard
        </h1>
        <p className="text-sm text-secondary-text font-light">
          Overview of your portfolio stats, visitor engagement, and direct inquiries.
        </p>
      </div>

      {/* Top Statistics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {statsList.map((stat) => {
          const IconComp = stat.icon;
          return (
            <Card hoverLift key={stat.name} className="bg-white border border-neutral-border p-5 rounded-[20px] flex flex-col justify-between">
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs font-semibold text-secondary-text uppercase tracking-wider">{stat.name}</span>
                <div className={`p-2.5 rounded-[12px] border ${stat.color}`}>
                  <IconComp size={16} />
                </div>
              </div>
              <span className="text-2xl sm:text-3xl font-extrabold font-epilogue text-primary-text mt-4">
                {stat.value}
              </span>
            </Card>
          );
        })}
      </div>

      {/* Main Grid: Messages table */}
      <div className="grid grid-cols-1 gap-6">
        <Card hoverLift={false} className="bg-white border border-neutral-border rounded-[20px] p-6">
          <div className="flex items-center justify-between border-b border-neutral-border pb-4 mb-4">
            <h2 className="text-base font-bold font-epilogue uppercase tracking-wide text-primary-text flex items-center gap-2">
              <MessageSquare size={18} className="text-primary" />
              Direct Client Inquiries ({messages.length})
            </h2>
            {counts.unreadMessages > 0 && (
              <span className="text-[10px] font-bold bg-secondary text-primary-text px-2 py-0.5 rounded-full uppercase tracking-wider">
                {counts.unreadMessages} New Inquiry
              </span>
            )}
          </div>

          {messages.length === 0 ? (
            <div className="py-12 text-center text-secondary-text text-sm font-light">
              No inquiries received yet. Submit the contact form on the home page to test.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="border-b border-neutral-border text-xs font-bold uppercase tracking-wider text-secondary-text">
                    <th className="pb-3 pt-1 px-2">Client Name</th>
                    <th className="pb-3 pt-1 px-2">Company</th>
                    <th className="pb-3 pt-1 px-2">Date Received</th>
                    <th className="pb-3 pt-1 px-2">Status</th>
                    <th className="pb-3 pt-1 px-2 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-border/50">
                  {messages.map((msg) => (
                    <tr
                      key={msg.id}
                      className={`hover:bg-neutral-bg/30 transition-colors ${
                        msg.status === 'unread' ? 'font-semibold text-primary' : 'text-secondary-text font-light'
                      }`}
                    >
                      <td className="py-3.5 px-2">
                        <div className="flex flex-col">
                          <span className="text-primary-text">{msg.name}</span>
                          <span className="text-[11px] text-secondary-text">{msg.email}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-2">{msg.company || '—'}</td>
                      <td className="py-3.5 px-2 text-xs flex items-center gap-1 mt-1.5 border-none">
                        <Calendar size={12} className="text-secondary-text" />
                        {new Date(msg.createdAt).toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>
                      <td className="py-3.5 px-2">
                        <span
                          className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                            msg.status === 'unread'
                              ? 'bg-secondary/15 text-primary-text border border-secondary/20'
                              : 'bg-neutral-bg text-secondary-text border border-neutral-border'
                          }`}
                        >
                          {msg.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-2 text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="p-1.5 h-auto rounded-[8px]"
                            title="View Message"
                            onClick={() => setSelectedMessage(msg)}
                          >
                            <Eye size={14} />
                          </Button>
                          {msg.status === 'unread' && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="p-1.5 h-auto text-success border-success/20 hover:bg-success/5 rounded-[8px]"
                              title="Mark as Read"
                              onClick={() => handleMarkAsRead(msg.id)}
                            >
                              <CheckCircle size={14} />
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            size="sm"
                            className="p-1.5 h-auto text-danger border-danger/20 hover:bg-danger/5 rounded-[8px]"
                            title="Delete Message"
                            onClick={() => handleDeleteMessage(msg.id)}
                          >
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>

      {/* Message Viewer Dialog */}
      <Dialog
        isOpen={!!selectedMessage}
        onClose={() => setSelectedMessage(null)}
        title="Client Message Details"
      >
        {selectedMessage && (
          <div className="flex flex-col gap-5 text-left text-sm leading-relaxed">
            <div className="grid grid-cols-2 gap-4 border-b border-neutral-border/50 pb-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-secondary-text tracking-wide">From Client</span>
                <p className="font-semibold text-primary-text">{selectedMessage.name}</p>
                <p className="text-xs text-secondary-text font-light">{selectedMessage.email}</p>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-secondary-text tracking-wide">Company Target</span>
                <p className="font-semibold text-primary-text">{selectedMessage.company || 'Not Provided'}</p>
                <p className="text-xs text-secondary-text font-light">
                  Received: {new Date(selectedMessage.createdAt).toLocaleString()}
                </p>
              </div>
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold text-secondary-text tracking-wide block mb-1">
                Project Inquiry Message Brief
              </span>
              <div className="p-4 bg-neutral-bg/60 border border-neutral-border rounded-[12px] text-primary-text font-light whitespace-pre-line leading-relaxed">
                {selectedMessage.message}
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-neutral-border/50">
              <Button
                variant="outline"
                className="text-danger border-danger/10 hover:bg-danger/5"
                onClick={() => handleDeleteMessage(selectedMessage.id)}
              >
                Delete Inquire
              </Button>
              <div className="flex gap-2">
                {selectedMessage.status === 'unread' && (
                  <Button
                    variant="primary"
                    onClick={() => handleMarkAsRead(selectedMessage.id)}
                  >
                    Mark as Read
                  </Button>
                )}
                <Button variant="outline" onClick={() => setSelectedMessage(null)}>
                  Close Viewer
                </Button>
              </div>
            </div>
          </div>
        )}
      </Dialog>
      
    </div>
  );
}
