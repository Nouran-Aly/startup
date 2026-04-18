# Database Schema (Firebase Firestore)

This schema supports Khidma MVP with **Egyptian Arabic** categories and **messages** that support both text and voice.

## 1) `users` collection

Document ID: `uid` (Firebase Auth UID)

```json
{
  "phone_number": "+201001234567",
  "role": "homeowner",
  "created_at": "timestamp",
  "last_login_at": "timestamp",
  "is_active": true
}
```

## 2) `profiles` collection

Document ID: `uid` (same as users UID)

```json
{
  "full_name": "أحمد علي",
  "category_key": "sabaka",
  "category_label_ar": "سباكة",
  "bio": "سباك مع خبرة",
  "is_verified": true,
  "national_id_photo_url": "https://...",
  "rating_avg": 4.8,
  "rating_count": 34,
  "updated_at": "timestamp"
}
```

**Categories (Egyptian Arabic, stored as `category_key` + `category_label_ar`):**

| `category_key` | `label_ar` (عرض للمستخدم) |
|----------------|---------------------------|
| `sabaka`       | سباكة                     |
| `kahramai`     | كهرباء                    |
| `naqasha`      | نقاشة                     |
| `nagara`       | نجارة                     |
| `takyif`       | تكييف                     |

## 3) `chats` collection

Document ID: `chat_id` (e.g. booking or job id)

```json
{
  "participant_ids": ["uid_homeowner", "uid_pro"],
  "last_message_preview": "مساء الخير",
  "last_message_at": "timestamp"
}
```

## 4) `messages` subcollection: `chats/{chat_id}/messages/{message_id}`

Supports **text**, **audio**, or both (`mixed`).

```json
{
  "sender_id": "uid_homeowner",
  "sender_role": "homeowner",
  "message_type": "text",
  "text_content": "محتاج سباك بكره الصبح",
  "audio_url": null,
  "locale": "ar-EG",
  "created_at": "timestamp",
  "read_at": null
}
```

Voice note from Pro (push-to-talk):

```json
{
  "sender_id": "uid_pro",
  "sender_role": "professional",
  "message_type": "audio",
  "text_content": null,
  "audio_url": "https://storage.../voice.m4a",
  "locale": "ar-EG",
  "created_at": "timestamp"
}
```

**Client logic:**

- Homeowner text messages: show **Listen (🔊)** control; use TTS with `locale: ar-EG` for playback when `text_content` is set.
- Pro messages: prefer `audio_url` playback; optional future STT to fill `text_content`.

## 5) `jobs`, `bookings`, `reviews`

See earlier MVP fields; use `category_key` / `category_label_ar` instead of English-only category names where applicable.
