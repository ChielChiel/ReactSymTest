<?php

namespace App\Entity;

use App\Repository\SoundRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=SoundRepository::class)
 */
class Sound
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="text")
     */
    private $title;

    /**
     * @ORM\Column(type="text")
     */
    private $transcriptie;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $image;

    /**
     * @ORM\Column(type="string", length=50)
     */
    private $mp3;

    /**
     * @ORM\Column(type="simple_array")
     */
    private $spelers = [];

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $videoId;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getTranscriptie(): ?string
    {
        return $this->transcriptie;
    }

    public function setTranscriptie(string $transcriptie): self
    {
        $this->transcriptie = $transcriptie;

        return $this;
    }

    public function getImage(): ?string
    {
        return $this->image;
    }

    public function setImage(string $image): self
    {
        $this->image = $image;

        return $this;
    }

    public function getMp3(): ?string
    {
        return $this->mp3;
    }

    public function setMp3(string $mp3): self
    {
        $this->mp3 = $mp3;

        return $this;
    }

    public function getSpelers(): ?array
    {
        return $this->spelers;
    }

    public function setSpelers(array $spelers): self
    {
        $this->spelers = $spelers;

        return $this;
    }

    public function getVideoId(): ?string
    {
        return $this->videoId;
    }

    public function setVideoId(string $videoId): self
    {
        $this->videoId = $videoId;

        return $this;
    }

    public function toArray()
    {
        return ['id' => $this->id, 'title' => $this->title ,'transcriptie' => $this->transcriptie ,'image' => $this->image,'mp3' => $this->mp3 ,'spelers' => $this->spelers, 'videoID' => $this->videoId];
    }

}
