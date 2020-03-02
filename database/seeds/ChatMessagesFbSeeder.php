<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Collection;
use LacosFofos\Firebase\ChatMessageFb;
use LacosFofos\Models\ChatGroup;
use LacosFofos\Models\User;
use Faker\Factory as FakerFactory;
use Illuminate\Http\UploadedFile;

class ChatMessagesFbSeeder extends Seeder
{
    private $allFakerFiles;
    private $fakerFilesPath = 'app/faker/chat_message_files';
    protected $numMessages = 10;
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->allFakerFiles = $this->getFakerFiles();
        /** @var EloquentCollection $chatGroups */
        $chatGroups = $this->getChatGroups();
        $users = User::all();
        $chatMessage = new ChatMessageFb();
        $self = $this;

        $chatGroups->each(function($group) use($users, $chatMessage, $self){
            $chatMessage->deleteMessages($group);
            foreach (range(1, $self->numMessages) as $value){
                $textOrFile = rand(1, 10) % 2 == 0 ? 'text' : 'file';

                if($textOrFile == 'text'){
                    $content = FakerFactory::create()->sentence(10);
                    $type = 'text';
                }else{
                    $content = $self->getUploadFile();
                    $type = $content->getExtension() === 'aac' ? 'audio' : 'image';
                }

                $chatMessage->create([
                    'chat_group' => $group,
                    'content' => $content,
                    'type' => $type,
                    'firebase_uid' => $users->random()->profile->firebase_uid
                ]);
            }
        });
    }

    protected function getChatGroups()
    {
        return ChatGroup::all();
    }

    private function getFakerFiles() : Collection
    {
        $path = storage_path($this->fakerFilesPath);
        return collect(\File::allFiles($path));
    }

    private function getUploadFile() : UploadedFile
    {
        $photoFile = $this->allFakerFiles->random();
        $uploadFile = new UploadedFile(
            $photoFile->getRealPath(),
            str_random(16). '.' . $photoFile->getExtension()
        );

        //Upload da photo
        return $uploadFile;
    }
}
