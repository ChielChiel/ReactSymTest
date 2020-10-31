<?php

namespace App\Controller;

use App\Entity\Sound;
use App\Repository\SoundRepository;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

//Youtube dl
require '../vendor/autoload.php';

use YoutubeDl\YoutubeDl;
use YoutubeDl\Exception\CopyrightException;
use YoutubeDl\Exception\NotFoundException;
use YoutubeDl\Exception\PrivateVideoException;
use FFMpeg;

/**
 * @Route("/api/sound", name="api_sound")
 */
class SoundController extends AbstractController
{
    private $entityManager;
    private $soundRepository;


    public function __construct(EntityManagerInterface $entityManager, SoundRepository $soundRepository)
    {
        $this->entityManager = $entityManager;
        $this->soundRepository = $soundRepository;
    }


    /**
    * @Route("/read", name="api_sound_read")
    */
    public function index()
    {
        $sounds = $this->soundRepository->findAll();
        $arrayOfSounds = [];
        foreach($sounds as $sound) {
            $arrayOfSounds[] = $sound->toArray();
        }
        return $this->json($arrayOfSounds);
    }

    /**
    * @Route("/create", name="api_sound_create")
    */
    public function create(Request $request)
    {
        $content = json_decode($request->getContent());

        $sound = new Sound();

        //$sound->setTitle($content->title);

        //$videoID = $content->id;
        //$dl = new YoutubeDl();

        $dl = new YoutubeDl([
            'extract-audio' => true,
            'audio-format' => 'mp3',
            'audio-quality' => 0, // best
            'output' => '%(title)s.%(ext)s',
        ]);
        // $dl->setDownloadPath('/home/user/downloads');
        // $dl = new YoutubeDl([
        //     'continue' => true, // force resume of partially downloaded files. By default, youtube-dl will resume downloads if possible.
        //     'format' => 'bestvideo',
        // ]);
        $dl->setDownloadPath('/Users/Michiel/Downloads');

        try {
            //$audio = $dl->download('https://www.youtube.com/embed/oDAw7vW7H0c?start=17&end=30');
            //echo $audio->getTitle(); // Will return Phonebloks
            $ffmpeg = FFMpeg\FFMpeg::create();
            $aud = $ffmpeg->open('/Users/Michiel/Downloads/Phonebloks.mp3');
            $aud->filters()->clip(FFMpeg\Coordinate\TimeCode::fromSeconds(30), FFMpeg\Coordinate\TimeCode::fromSeconds(15));
            $audio_format = new FFMpeg\Format\Audio\Mp3();
            $aud->save($audio_format, '/Users/Michiel/Downloads/new.mp3');




            // $video->getFile(); // \SplFileInfo instance of downloaded file
        } catch (NotFoundException $e) {
            // Video not found
            echo "no1";
        } catch (PrivateVideoException $e) {
            echo "no2";

            // Video is private
        } catch (CopyrightException $e) {
            echo "no3";

            // The YouTube account associated with this video has been terminated due to multiple third-party notifications of copyright infringement
        } catch (\Exception $e) {
            echo "no4";
            dd($e);
            // Failed to download
        }



        // try {
        //     $this->entityManager->persist($sound);
        //     $this->entityManager->flush();
        //     return $this->json([
        //         'sound' => $sound->toArray(),
        //     ]);
        // } catch (Exception $exception) {
        //     //throw $th;
        // }
        return $this->json([
                'sound' => $sound->toArray(),
            ]);
    }



}
