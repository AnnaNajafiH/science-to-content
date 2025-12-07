import { Loader2, Send, X } from "lucide-react";
import { useInternalBrief } from "../../Contexts/internalBriefContext/useInternalBrief";

const BriefEmailModal: React.FC = () => {
  const {closeEmailModal, emailRecipients, setEmailRecipients, emailSentAck, emailSending, sendEmail } = useInternalBrief();
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
          className="absolute inset-0 bg-black/40"
          onClick={() => closeEmailModal()}
        />
        <div className="relative z-10 w-full max-w-xl bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold">Send Brief via Email</h4>
            <button
              onClick={() => closeEmailModal()}
              className="p-2 rounded hover:bg-gray-100"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-sm text-gray-600 mb-3">
            Enter recipient emails (comma, semicolon or newline separated).
          </p>

          <textarea
            value={emailRecipients}
            onChange={(e) => setEmailRecipients(e.target.value)}
            placeholder="alice@example.com, bob@example.com"
            className="w-full border border-gray-300 rounded-md p-3 min-h-[120px] mb-3"
          />

          {emailSentAck && (
            <p
              className={`text-sm mb-3 ${
                emailSentAck.includes("success")
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {emailSentAck}
            </p>
          )}

          <div className="flex justify-end gap-3">
            <button
              onClick={() => closeEmailModal()}
              className="px-4 py-2 rounded-lg border-2 border-beiersdorf-blue bg-white text-beiersdorf-blue hover:bg-beiersdorf-light transition"
            >
              Cancel
            </button>
            <button
              onClick={sendEmail}
              disabled={emailSending}
              className="px-4 py-2 rounded-lg bg-beiersdorf-blue text-white hover:bg-beiersdorf-navy transition flex items-center gap-2"
            >
              {emailSending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Send
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    );
};

export default BriefEmailModal;